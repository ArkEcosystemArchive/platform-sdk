import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { KnownWalletService } from "../services/known-wallet-service";
import { DataRepository } from "../../../repositories/data-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { TransactionService } from "./wallet-transaction-service";
import {
	IReadWriteWallet,
	IWalletData,
	ProfileSetting,
	WalletData,
	WalletFlag,
	WalletSetting,
	IExchangeRateService,
	IKnownWalletService,
	IReadWriteWalletAttributes,
	ITransactionService,
	ISettingRepository,
	IDataRepository,
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
import { emitProfileChanged } from "../helpers";

export class Wallet implements IReadWriteWallet {
	readonly #attributes: AttributeBag<IReadWriteWalletAttributes> = new AttributeBag();
	readonly #dataRepository: IDataRepository;
	readonly #settingRepository: ISettingRepository;
	readonly #transactionService: ITransactionService;
	readonly #walletGate: IWalletGate;
	readonly #walletSynchroniser: IWalletSynchroniser;
	readonly #walletMutator: IWalletMutator;
	readonly #voteRegistry: IVoteRegistry;
	readonly #transactionIndex: ITransactionIndex;
	readonly #walletImportFormat: IWalletImportFormat;
	readonly #multiSignature: IMultiSignature;

	public constructor(id: string, initialState: any) {
		this.#attributes = new AttributeBag<IReadWriteWalletAttributes>({
			id,
			initialState,
			restorationState: { full: false, partial: false },
		});

		this.#dataRepository = new DataRepository();
		this.#settingRepository = new SettingRepository(Object.values(WalletSetting));
		this.#transactionService = new TransactionService(this);
		this.#walletGate = new WalletGate(this);
		this.#walletSynchroniser = new WalletSynchroniser(this);
		this.#walletMutator = new WalletMutator(this);
		this.#voteRegistry = new VoteRegistry(this);
		this.#transactionIndex = new TransactionIndex(this);
		this.#walletImportFormat = new WalletImportFormat(this);
		this.#multiSignature = new MultiSignature(this);

		this.restore();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public id(): string {
		return this.#attributes.get("id");
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public coin(): Coins.Coin {
		return this.#attributes.get<Coins.Coin>('coin');
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public network(): Coins.Network {
		return this.coin().network();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public currency(): string {
		return this.network().ticker();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public exchangeCurrency(): string {
		return State.profile().settings().get(ProfileSetting.ExchangeCurrency) as string;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public alias(): string | undefined {
		return this.settings().get(WalletSetting.Alias);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public displayName(): string | undefined {
		return this.alias() || this.username() || this.knownName();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public primaryKey(): string {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').primaryKey();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public address(): string {
		return this.#attributes.get("address");
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public publicKey(): string | undefined {
		return this.#attributes.get("publicKey");
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public balance(): BigNumber {
		const value: string | undefined = this.data().get(WalletData.Balance);

		if (value === undefined) {
			return BigNumber.ZERO;
		}

		return BigNumber.make(value);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public convertedBalance(): BigNumber {
		if (this.network().isTest()) {
			return BigNumber.ZERO;
		}

		return container
			.get<IExchangeRateService>(Identifiers.ExchangeRateService)
			.exchange(this.currency(), this.exchangeCurrency(), DateTime.make(), this.balance().divide(1e8));
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public nonce(): BigNumber {
		const value: string | undefined = this.data().get(WalletData.Sequence);

		if (value === undefined) {
			return BigNumber.ZERO;
		}

		return BigNumber.make(value);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public avatar(): string {
		const value: string | undefined = this.data().get(WalletSetting.Avatar);

		if (value) {
			return value;
		}

		return this.#attributes.get<string>('avatar');
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public getRelays(): string[] {
		return State.profile().peers()
			.getRelays(this.coinId(), this.networkId())
			.map((peer) => peer.host);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public async connect(): Promise<void> {
		if (!this.hasCoin()) {
			throw new Exceptions.BadVariableDependencyException(this.constructor.name, "connect", "coin");
		}

		await this.#attributes.get<Coins.Coin>('coin').__construct();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public hasCoin(): boolean {
		return this.#attributes.hasStrict('coin');
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public hasSyncedWithNetwork(): boolean {
		if (this.#attributes.get<Contracts.WalletData>('wallet') === undefined) {
			return false;
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').hasPassed();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public data(): IDataRepository {
		return this.#dataRepository;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public settings(): ISettingRepository {
		return this.#settingRepository;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public toData(): Contracts.WalletData {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet');
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public toObject(): IWalletData {
		return new WalletSerialiser(this).toJSON();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public knownName(): string | undefined {
		return container.get<KnownWalletService>(Identifiers.KnownWalletService).name(this.networkId(), this.address());
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public secondPublicKey(): string | undefined {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').secondPublicKey();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public username(): string | undefined {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').username();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isDelegate(): boolean {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').isDelegate();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isResignedDelegate(): boolean {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').isResignedDelegate();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isKnown(): boolean {
		return container.get<IKnownWalletService>(Identifiers.KnownWalletService).is(this.networkId(), this.address());
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isOwnedByExchange(): boolean {
		return container
			.get<IKnownWalletService>(Identifiers.KnownWalletService)
			.isExchange(this.networkId(), this.address());
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isOwnedByTeam(): boolean {
		return container
			.get<IKnownWalletService>(Identifiers.KnownWalletService)
			.isTeam(this.networkId(), this.address());
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isLedger(): boolean {
		return this.data().get(WalletData.LedgerPath) !== undefined;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isMultiSignature(): boolean {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').isMultiSignature();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isSecondSignature(): boolean {
		if (!this.#attributes.get<Contracts.WalletData>('wallet')) {
			throw new Error("This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.");
		}

		return this.#attributes.get<Contracts.WalletData>('wallet').isSecondSignature();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isStarred(): boolean {
		return this.data().get(WalletFlag.Starred) === true;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public toggleStarred(): void {
		this.data().set(WalletFlag.Starred, !this.isStarred());

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public coinId(): string {
		return this.manifest().get<string>("name");
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public networkId(): string {
		return this.network().id();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public manifest(): Coins.Manifest {
		return this.#attributes.get<Coins.Coin>('coin').manifest();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public config(): Coins.Config {
		return this.#attributes.get<Coins.Coin>('coin').config();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public client(): Contracts.ClientService {
		return this.#attributes.get<Coins.Coin>('coin').client();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public dataTransferObject(): Contracts.DataTransferObjectService {
		return this.#attributes.get<Coins.Coin>('coin').dataTransferObject();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public identity(): Contracts.IdentityService {
		return this.#attributes.get<Coins.Coin>('coin').identity();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public ledger(): Contracts.LedgerService {
		return this.#attributes.get<Coins.Coin>('coin').ledger();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public link(): Contracts.LinkService {
		return this.#attributes.get<Coins.Coin>('coin').link();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public message(): Contracts.MessageService {
		return this.#attributes.get<Coins.Coin>('coin').message();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public peer(): Contracts.PeerService {
		return this.#attributes.get<Coins.Coin>('coin').peer();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public transaction(): ITransactionService {
		return this.#transactionService;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public transactionTypes(): Coins.CoinTransactionTypes {
		return this.coin().manifest().get<object>("networks")[this.networkId()].transactionTypes;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public gate(): IWalletGate {
		return this.#walletGate;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public synchroniser(): IWalletSynchroniser {
		return this.#walletSynchroniser;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public mutator(): IWalletMutator {
		return this.#walletMutator;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public voting(): IVoteRegistry {
		return this.#voteRegistry;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public transactionIndex(): ITransactionIndex {
		return this.#transactionIndex;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public wif(): IWalletImportFormat {
		return this.#walletImportFormat;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public multiSignature(): IMultiSignature {
		return this.#multiSignature;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public explorerLink(): string {
		return this.link().wallet(this.address());
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public markAsFullyRestored(): void {
		this.#attributes.set('restorationState', {
			full: true,
			partial: false,
		});
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public hasBeenFullyRestored(): boolean {
		return this.#attributes.get('restorationState').full;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public markAsPartiallyRestored(): void {
		this.#attributes.set('restorationState', {
			full: false,
			partial: true,
		});
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public hasBeenPartiallyRestored(): boolean {
		return this.#attributes.get('restorationState').partial;
	}

	/** {@inheritDoc IWalletFactory.generate} */
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
