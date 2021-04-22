import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { KnownWalletService } from "../services/known-wallet-service";
import { DataRepository } from "../../../repositories/data-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { ReadOnlyWallet } from "./read-only-wallet";
import { TransactionService } from "./wallet-transaction-service";
import {
	IReadWriteWallet,
	IReadOnlyWallet,
	IWalletData,
	ProfileSetting,
	WalletData,
	WalletFlag,
	WalletSetting,
	IExchangeRateService,
	IKnownWalletService,
	IReadWriteWalletAttributes,
} from "../../../contracts";
import { State } from "../../../environment/state";
import { AttributeBag } from "../../../helpers/attribute-bag";
import { WalletGate } from "./wallet.gate";
import { WalletSynchroniser } from "./wallet.synchroniser";
import { IWalletSynchroniser } from "../../../contracts/wallets/wallet.synchroniser";
import { IWalletMutator } from "../../../contracts/wallets/wallet.mutator";
import { WalletMutator } from "./wallet.mutator";
import { IWalletGate } from "../../../contracts/wallets/wallet.gate";
import { VoteRegistry } from "./services/vote-registry";
import { TransactionIndex } from "./services/transaction-index";
import { WalletSerialiser } from "./services/serialiser";
import { ITransactionIndex } from "../../../contracts/wallets/services/transaction-index";
import { IVoteRegistry } from "../../../contracts/wallets/services/vote-registry";
import { WalletImportFormat } from "./services/wif";
import { IWalletImportFormat } from "../../../contracts/wallets/services/wif";
import { MultiSignature } from "./services/multi-signature";
import { IMultiSignature } from "../../../contracts/wallets/services/multi-signature";

export class Wallet implements IReadWriteWallet {
	readonly #attributes: AttributeBag<IReadWriteWalletAttributes> = new AttributeBag();
	readonly #dataRepository: DataRepository;
	readonly #settingRepository: SettingRepository;
	readonly #transactionService: TransactionService;

	public constructor(id: string, initialState: any) {
		this.#attributes = new AttributeBag<IReadWriteWalletAttributes>({
			id,
			initialState,
			restorationState: { full: false, partial: false },
		});

		this.#dataRepository = new DataRepository();
		this.#settingRepository = new SettingRepository(Object.values(WalletSetting));
		this.#transactionService = new TransactionService(this);

		this.restore();
	}

	/**
	 * These methods serve as helpers to proxy certain method calls to the parent profile.
	 */

	public getRelays(): string[] {
		return State.profile().peers()
			.getRelays(this.coinId(), this.networkId())
			.map((peer) => peer.host);
	}

	/**
	 * Connects the coin to the blockchain and configures it.
	 *
	 * @remark
	 * This only needs to be called if `setCoin` is called with `sync: false`.
	 *
	 * @returns {Promise<void>}
	 * @memberof Wallet
	 */
	public async connect(): Promise<void> {
		if (!this.hasCoin()) {
			throw new Exceptions.BadVariableDependencyException(this.constructor.name, "connect", "coin");
		}

		await this.#attributes.get<Coins.Coin>('coin').__construct();
	}

	/**
	 * Determines if the instance already has a coin set.
	 *
	 * @remark
	 * This only determines if a coin instance has been created, not if it
	 * has been synchronized and configured with the blockchain network.
	 *
	 * @returns {boolean}
	 * @memberof Wallet
	 */
	public hasCoin(): boolean {
		return this.#attributes.hasStrict('coin');
	}

	/**
	 * These methods serve as getters to the underlying data and dependencies.
	 */

	public hasSyncedWithNetwork(): boolean {
		if (this.#attributes.get<Contracts.WalletData>('wallet') === undefined) {
			return false;
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').hasPassed();
	}

	public id(): string {
		return this.#attributes.get("id");
	}

	public coin(): Coins.Coin {
		return this.#attributes.get<Coins.Coin>('coin');
	}

	public network(): Coins.Network {
		return this.coin().network();
	}

	public currency(): string {
		return this.network().ticker();
	}

	public exchangeCurrency(): string {
		return State.profile().settings().get(ProfileSetting.ExchangeCurrency) as string;
	}

	public alias(): string | undefined {
		return this.settings().get(WalletSetting.Alias);
	}

	public displayName(): string | undefined {
		return this.alias() || this.username() || this.knownName();
	}

	public primaryKey(): string {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').primaryKey();
	}

	public address(): string {
		return this.#attributes.get("address");
	}

	public publicKey(): string | undefined {
		return this.#attributes.get("publicKey");
	}

	public balance(): BigNumber {
		const value: string | undefined = this.data().get(WalletData.Balance);

		if (value === undefined) {
			return BigNumber.ZERO;
		}

		return BigNumber.make(value);
	}

	public convertedBalance(): BigNumber {
		if (this.network().isTest()) {
			return BigNumber.ZERO;
		}

		return container
			.get<IExchangeRateService>(Identifiers.ExchangeRateService)
			.exchange(this.currency(), this.exchangeCurrency(), DateTime.make(), this.balance().divide(1e8));
	}

	public nonce(): BigNumber {
		const value: string | undefined = this.data().get(WalletData.Sequence);

		if (value === undefined) {
			return BigNumber.ZERO;
		}

		return BigNumber.make(value);
	}

	public avatar(): string {
		const value: string | undefined = this.data().get(WalletSetting.Avatar);

		if (value) {
			return value;
		}

		return this.#attributes.get<string>('avatar');
	}

	public data(): DataRepository {
		return this.#dataRepository;
	}

	public settings(): SettingRepository {
		return this.#settingRepository;
	}

	public toData(): Contracts.WalletData {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet');
	}

	public toObject(): IWalletData {
		return new WalletSerialiser(this).toJSON();
	}

	/**
	 * These methods serve as identifiers for special types of wallets.
	 */

	public knownName(): string | undefined {
		return container.get<KnownWalletService>(Identifiers.KnownWalletService).name(this.networkId(), this.address());
	}

	public secondPublicKey(): string | undefined {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').secondPublicKey();
	}

	public username(): string | undefined {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').username();
	}

	public isDelegate(): boolean {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').isDelegate();
	}

	public isResignedDelegate(): boolean {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').isResignedDelegate();
	}

	public isKnown(): boolean {
		return container.get<IKnownWalletService>(Identifiers.KnownWalletService).is(this.networkId(), this.address());
	}

	public isOwnedByExchange(): boolean {
		return container
			.get<IKnownWalletService>(Identifiers.KnownWalletService)
			.isExchange(this.networkId(), this.address());
	}

	public isOwnedByTeam(): boolean {
		return container
			.get<IKnownWalletService>(Identifiers.KnownWalletService)
			.isTeam(this.networkId(), this.address());
	}

	public isLedger(): boolean {
		return this.data().get(WalletData.LedgerPath) !== undefined;
	}

	public isMultiSignature(): boolean {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').isMultiSignature();
	}

	public isSecondSignature(): boolean {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').isSecondSignature();
	}

	public isStarred(): boolean {
		return this.data().get(WalletFlag.Starred) === true;
	}

	public toggleStarred(): void {
		this.data().set(WalletFlag.Starred, !this.isStarred());
	}

	/**
	 * All methods below this line are convenience methods that serve as proxies to the underlying coin implementation.
	 *
	 * The purpose of these methods is to reduce duplication and prevent consumers from implementing
	 * convoluted custom implementations that deviate from how things should be used.
	 *
	 * Any changes in how things need to be handled by consumers should be made in this package!
	 */

	public coinId(): string {
		return this.manifest().get<string>("name");
	}

	public networkId(): string {
		return this.network().id();
	}

	public manifest(): Coins.Manifest {
		return this.#attributes.get<Coins.Coin>('coin').manifest();
	}

	public config(): Coins.Config {
		return this.#attributes.get<Coins.Coin>('coin').config();
	}

	public client(): Contracts.ClientService {
		return this.#attributes.get<Coins.Coin>('coin').client();
	}

	public dataTransferObject(): Contracts.DataTransferObjectService {
		return this.#attributes.get<Coins.Coin>('coin').dataTransferObject();
	}

	public identity(): Contracts.IdentityService {
		return this.#attributes.get<Coins.Coin>('coin').identity();
	}

	public ledger(): Contracts.LedgerService {
		return this.#attributes.get<Coins.Coin>('coin').ledger();
	}

	public link(): Contracts.LinkService {
		return this.#attributes.get<Coins.Coin>('coin').link();
	}

	public message(): Contracts.MessageService {
		return this.#attributes.get<Coins.Coin>('coin').message();
	}

	public peer(): Contracts.PeerService {
		return this.#attributes.get<Coins.Coin>('coin').peer();
	}

	public transaction(): TransactionService {
		return this.#transactionService;
	}

	public transactionTypes(): Coins.CoinTransactionTypes {
		return this.coin().manifest().get<object>("networks")[this.networkId()].transactionTypes;
	}

	public gate(): IWalletGate {
		return new WalletGate(this);
	}

	public synchroniser(): IWalletSynchroniser {
		return new WalletSynchroniser(this);
	}

	public mutator(): IWalletMutator {
		return new WalletMutator(this);
	}

	public voting(): IVoteRegistry {
		return new VoteRegistry(this);
	}

	public transactionIndex(): ITransactionIndex {
		return new TransactionIndex(this);
	}

	public wif(): IWalletImportFormat {
		return new WalletImportFormat(this);
	}

	public multiSignature(): IMultiSignature {
		return new MultiSignature(this);
	}

	public explorerLink(): string {
		return this.link().wallet(this.address());
	}

	public markAsFullyRestored(): void {
		this.#attributes.set('restorationState', {
			full: true,
			partial: false,
		});
	}

	public hasBeenFullyRestored(): boolean {
		return this.#attributes.get('restorationState').full;
	}

	public markAsPartiallyRestored(): void {
		this.#attributes.set('restorationState', {
			full: false,
			partial: true,
		});
	}

	public hasBeenPartiallyRestored(): boolean {
		return this.#attributes.get('restorationState').partial;
	}

	/** {@inheritDoc IReadWriteWallet.getAttributes} */
    public getAttributes(): AttributeBag<IReadWriteWalletAttributes>
    {
        return this.#attributes;
    }

	private restore(): void {
		this.data().set(
			WalletData.Balance,
			BigNumber.make(this.data().get<string>(WalletData.Balance) || BigNumber.ZERO),
		);

		this.data().set(
			WalletData.Sequence,
			BigNumber.make(this.data().get<string>(WalletData.Sequence) || BigNumber.ZERO),
		);
	}
}
