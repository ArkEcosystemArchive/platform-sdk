import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
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
	WalletImportMethod,
	IProfile,
} from "../../../contracts";
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
	readonly #profile: IProfile;
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

	public constructor(id: string, initialState: any, profile: IProfile) {
		this.#profile = profile;
		this.#attributes = new AttributeBag<IReadWriteWalletAttributes>({
			id,
			initialState,
			restorationState: { full: false, partial: false },
		});

		this.#dataRepository = new DataRepository();
		this.#settingRepository = new SettingRepository(profile, Object.values(WalletSetting));
		this.#transactionService = new TransactionService(this);
		this.#walletGate = new WalletGate(this);
		this.#walletSynchroniser = new WalletSynchroniser(this);
		this.#walletMutator = new WalletMutator(this);
		this.#voteRegistry = new VoteRegistry(this);
		this.#transactionIndex = new TransactionIndex(this);
		this.#walletImportFormat = new WalletImportFormat(this);
		this.#multiSignature = new MultiSignature(this);

		this.#restore();
	}

	/** {@inheritDoc IReadWriteWallet.profile} */
	public profile(): IProfile {
		return this.#profile;
	}

	/** {@inheritDoc IReadWriteWallet.id} */
	public id(): string {
		return this.#attributes.get("id");
	}

	/** {@inheritDoc IReadWriteWallet.coin} */
	public coin(): Coins.Coin {
		return this.#attributes.get<Coins.Coin>("coin");
	}

	/** {@inheritDoc IReadWriteWallet.network} */
	public network(): Coins.Network {
		return this.coin().network();
	}

	/** {@inheritDoc IReadWriteWallet.currency} */
	public currency(): string {
		return this.network().ticker();
	}

	/** {@inheritDoc IReadWriteWallet.exchangeCurrency} */
	public exchangeCurrency(): string {
		return this.#profile.settings().get(ProfileSetting.ExchangeCurrency) as string;
	}

	/** {@inheritDoc IReadWriteWallet.alias} */
	public alias(): string | undefined {
		return this.settings().get(WalletSetting.Alias);
	}

	/** {@inheritDoc IReadWriteWallet.displayName} */
	public displayName(): string | undefined {
		return this.alias() || this.username() || this.knownName();
	}

	/** {@inheritDoc IReadWriteWallet.primaryKey} */
	public primaryKey(): string {
		if (!this.#attributes.get<Contracts.WalletData>("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}

		return this.#attributes.get<Contracts.WalletData>("wallet").primaryKey();
	}

	/** {@inheritDoc IReadWriteWallet.address} */
	public address(): string {
		return this.data().get(WalletData.Address)!;
	}

	/** {@inheritDoc IReadWriteWallet.publicKey} */
	public publicKey(): string | undefined {
		return this.data().get(WalletData.PublicKey);
	}

	/** {@inheritDoc IReadWriteWallet.balance} */
	public balance(): BigNumber {
		const value: Contracts.WalletBalance | undefined = this.data().get(WalletData.Balance);

		return BigNumber.make(value?.available || 0);
	}

	/** {@inheritDoc IReadWriteWallet.convertedBalance} */
	public convertedBalance(): BigNumber {
		if (this.network().isTest()) {
			return BigNumber.ZERO;
		}

		return container
			.get<IExchangeRateService>(Identifiers.ExchangeRateService)
			.exchange(this.currency(), this.exchangeCurrency(), DateTime.make(), this.balance().divide(1e8));
	}

	/** {@inheritDoc IReadWriteWallet.nonce} */
	public nonce(): BigNumber {
		const value: string | undefined = this.data().get(WalletData.Sequence);

		if (value === undefined) {
			return BigNumber.ZERO;
		}

		return BigNumber.make(value);
	}

	/** {@inheritDoc IReadWriteWallet.avatar} */
	public avatar(): string {
		const value: string | undefined = this.data().get(WalletSetting.Avatar);

		if (value) {
			return value;
		}

		return this.#attributes.get<string>("avatar");
	}

	/** {@inheritDoc IReadWriteWallet.getRelays} */
	public getRelays(): string[] {
		return this.#profile
			.peers()
			.getRelays(this.coinId(), this.networkId())
			.map((peer) => peer.host);
	}

	/** {@inheritDoc IReadWriteWallet.connect} */
	public async connect(): Promise<void> {
		if (!this.hasCoin()) {
			throw new Exceptions.BadVariableDependencyException(this.constructor.name, this.connect.name, "coin");
		}

		await this.#attributes.get<Coins.Coin>("coin").__construct();
	}

	/** {@inheritDoc IReadWriteWallet.hasCoin} */
	public hasCoin(): boolean {
		return this.#attributes.hasStrict("coin");
	}

	/** {@inheritDoc IReadWriteWallet.hasSyncedWithNetwork} */
	public hasSyncedWithNetwork(): boolean {
		const wallet: Contracts.WalletData | undefined = this.#attributes.get<Contracts.WalletData>("wallet");

		if (wallet === undefined) {
			return false;
		}

		return wallet.hasPassed();
	}

	/** {@inheritDoc IReadWriteWallet.data} */
	public data(): IDataRepository {
		return this.#dataRepository;
	}

	/** {@inheritDoc IReadWriteWallet.settings} */
	public settings(): ISettingRepository {
		return this.#settingRepository;
	}

	/** {@inheritDoc IReadWriteWallet.toData} */
	public toData(): Contracts.WalletData {
		if (!this.#attributes.get<Contracts.WalletData>("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}

		return this.#attributes.get<Contracts.WalletData>("wallet");
	}

	/** {@inheritDoc IReadWriteWallet.toObject} */
	public toObject(): IWalletData {
		return new WalletSerialiser(this).toJSON();
	}

	/** {@inheritDoc IReadWriteWallet.knownName} */
	public knownName(): string | undefined {
		return container.get<KnownWalletService>(Identifiers.KnownWalletService).name(this.networkId(), this.address());
	}

	/** {@inheritDoc IReadWriteWallet.secondPublicKey} */
	public secondPublicKey(): string | undefined {
		if (!this.#attributes.get<Contracts.WalletData>("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}

		return this.#attributes.get<Contracts.WalletData>("wallet").secondPublicKey();
	}

	/** {@inheritDoc IReadWriteWallet.username} */
	public username(): string | undefined {
		if (!this.#attributes.get<Contracts.WalletData>("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}

		return this.#attributes.get<Contracts.WalletData>("wallet").username();
	}

	/** {@inheritDoc IReadWriteWallet.isDelegate} */
	public isDelegate(): boolean {
		if (!this.#attributes.get<Contracts.WalletData>("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}

		return this.#attributes.get<Contracts.WalletData>("wallet").isDelegate();
	}

	/** {@inheritDoc IReadWriteWallet.isResignedDelegate} */
	public isResignedDelegate(): boolean {
		if (!this.#attributes.get<Contracts.WalletData>("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}

		return this.#attributes.get<Contracts.WalletData>("wallet").isResignedDelegate();
	}

	/** {@inheritDoc IReadWriteWallet.isKnown} */
	public isKnown(): boolean {
		return container.get<IKnownWalletService>(Identifiers.KnownWalletService).is(this.networkId(), this.address());
	}

	/** {@inheritDoc IReadWriteWallet.isOwnedByExchange} */
	public isOwnedByExchange(): boolean {
		return container
			.get<IKnownWalletService>(Identifiers.KnownWalletService)
			.isExchange(this.networkId(), this.address());
	}

	/** {@inheritDoc IReadWriteWallet.isOwnedByTeam} */
	public isOwnedByTeam(): boolean {
		return container
			.get<IKnownWalletService>(Identifiers.KnownWalletService)
			.isTeam(this.networkId(), this.address());
	}

	/** {@inheritDoc IReadWriteWallet.isLedger} */
	public isLedger(): boolean {
		return this.data().get(WalletData.DerivationPath) !== undefined;
	}

	/** {@inheritDoc IReadWriteWallet.isMultiSignature} */
	public isMultiSignature(): boolean {
		if (!this.#attributes.get<Contracts.WalletData>("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}

		return this.#attributes.get<Contracts.WalletData>("wallet").isMultiSignature();
	}

	/** {@inheritDoc IReadWriteWallet.isSecondSignature} */
	public isSecondSignature(): boolean {
		if (!this.#attributes.get<Contracts.WalletData>("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}

		return this.#attributes.get<Contracts.WalletData>("wallet").isSecondSignature();
	}

	/** {@inheritDoc IReadWriteWallet.isStarred} */
	public isStarred(): boolean {
		return this.data().get(WalletFlag.Starred) === true;
	}

	/** {@inheritDoc IReadWriteWallet.toggleStarred} */
	public toggleStarred(): void {
		this.data().set(WalletFlag.Starred, !this.isStarred());

		this.profile().status().markAsDirty();
	}

	/** {@inheritDoc IReadWriteWallet.coinId} */
	public coinId(): string {
		return this.manifest().get<string>("name");
	}

	/** {@inheritDoc IReadWriteWallet.networkId} */
	public networkId(): string {
		return this.network().id();
	}

	/** {@inheritDoc IReadWriteWallet.manifest} */
	public manifest(): Coins.Manifest {
		return this.#attributes.get<Coins.Coin>("coin").manifest();
	}

	/** {@inheritDoc IReadWriteWallet.config} */
	public config(): Coins.Config {
		return this.#attributes.get<Coins.Coin>("coin").config();
	}

	/** {@inheritDoc IReadWriteWallet.client} */
	public client(): Services.ClientService {
		return this.#attributes.get<Coins.Coin>("coin").client();
	}

	/** {@inheritDoc IReadWriteWallet.dataTransferObject} */
	public dataTransferObject(): Services.DataTransferObjectService {
		return this.#attributes.get<Coins.Coin>("coin").dataTransferObject();
	}

	/** {@inheritDoc IReadWriteWallet.identity} */
	public identity(): Services.IdentityService {
		return this.#attributes.get<Coins.Coin>("coin").identity();
	}

	/** {@inheritDoc IReadWriteWallet.ledger} */
	public ledger(): Services.LedgerService {
		return this.#attributes.get<Coins.Coin>("coin").ledger();
	}

	/** {@inheritDoc IReadWriteWallet.link} */
	public link(): Services.LinkService {
		return this.#attributes.get<Coins.Coin>("coin").link();
	}

	/** {@inheritDoc IReadWriteWallet.message} */
	public message(): Services.MessageService {
		return this.#attributes.get<Coins.Coin>("coin").message();
	}

	/** {@inheritDoc IReadWriteWallet.signatory} */
	public signatory(): Services.SignatoryService {
		return this.#attributes.get<Coins.Coin>("coin").signatory();
	}

	/** {@inheritDoc IReadWriteWallet.transaction} */
	public transaction(): ITransactionService {
		return this.#transactionService;
	}

	/** {@inheritDoc IReadWriteWallet.transactionTypes} */
	public transactionTypes(): Coins.CoinTransactionTypes[] {
		const manifest: Coins.NetworkManifest = this.coin().manifest().get<object>("networks")[this.networkId()];

		return manifest.transactions.types;
	}

	/** {@inheritDoc IReadWriteWallet.gate} */
	public gate(): IWalletGate {
		return this.#walletGate;
	}

	/** {@inheritDoc IReadWriteWallet.synchroniser} */
	public synchroniser(): IWalletSynchroniser {
		return this.#walletSynchroniser;
	}

	/** {@inheritDoc IReadWriteWallet.mutator} */
	public mutator(): IWalletMutator {
		return this.#walletMutator;
	}

	/** {@inheritDoc IReadWriteWallet.voting} */
	public voting(): IVoteRegistry {
		return this.#voteRegistry;
	}

	/** {@inheritDoc IReadWriteWallet.transactionIndex} */
	public transactionIndex(): ITransactionIndex {
		return this.#transactionIndex;
	}

	/** {@inheritDoc IReadWriteWallet.wif} */
	public wif(): IWalletImportFormat {
		return this.#walletImportFormat;
	}

	/** {@inheritDoc IReadWriteWallet.multiSignature} */
	public multiSignature(): IMultiSignature {
		return this.#multiSignature;
	}

	/** {@inheritDoc IReadWriteWallet.explorerLink} */
	public explorerLink(): string {
		return this.link().wallet(this.address());
	}

	/** {@inheritDoc IReadWriteWallet.markAsFullyRestored} */
	public markAsFullyRestored(): void {
		this.#attributes.set("restorationState", {
			full: true,
			partial: false,
		});
	}

	/** {@inheritDoc IReadWriteWallet.hasBeenFullyRestored} */
	public hasBeenFullyRestored(): boolean {
		return this.#attributes.get("restorationState").full;
	}

	/** {@inheritDoc IReadWriteWallet.markAsPartiallyRestored} */
	public markAsPartiallyRestored(): void {
		this.#attributes.set("restorationState", {
			full: false,
			partial: true,
		});
	}

	/** {@inheritDoc IReadWriteWallet.hasBeenPartiallyRestored} */
	public hasBeenPartiallyRestored(): boolean {
		return this.#attributes.get("restorationState").partial;
	}

	/** {@inheritDoc IReadWriteWallet.getAttributes} */
	public getAttributes(): AttributeBag<IReadWriteWalletAttributes> {
		return this.#attributes;
	}

	/** {@inheritDoc IReadWriteWallet.canVote} */
	public canVote(): boolean {
		return this.voting().available() > 0;
	}

	/** {@inheritDoc IReadWriteWallet.actsWithMnemonic} */
	public actsWithMnemonic(): boolean {
		return [
			WalletImportMethod.BIP39.MNEMONIC,
			WalletImportMethod.BIP44.MNEMONIC,
			WalletImportMethod.BIP49.MNEMONIC,
			WalletImportMethod.BIP84.MNEMONIC,
		].includes(this.data().get(WalletData.ImportMethod)!);
	}

	/** {@inheritDoc IReadWriteWallet.actsWithAddress} */
	public actsWithAddress(): boolean {
		return this.data().get(WalletData.ImportMethod) === WalletImportMethod.Address;
	}

	/** {@inheritDoc IReadWriteWallet.actsWithPublicKey} */
	public actsWithPublicKey(): boolean {
		return this.data().get(WalletData.ImportMethod) === WalletImportMethod.PublicKey;
	}

	/** {@inheritDoc IReadWriteWallet.actsWithPrivateKey} */
	public actsWithPrivateKey(): boolean {
		return this.data().get(WalletData.ImportMethod) === WalletImportMethod.PrivateKey;
	}

	/** {@inheritDoc IReadWriteWallet.actsWithAddressWithDerivationPath} */
	public actsWithAddressWithDerivationPath(): boolean {
		return [
			WalletImportMethod.BIP39.ADDRESS_WITH_DERIVATION,
			WalletImportMethod.BIP44.ADDRESS_WITH_DERIVATION,
			WalletImportMethod.BIP49.ADDRESS_WITH_DERIVATION,
			WalletImportMethod.BIP84.ADDRESS_WITH_DERIVATION,
		].includes(this.data().get(WalletData.ImportMethod)!);
	}

	/** {@inheritDoc IReadWriteWallet.actsWithMnemonicWithEncryption} */
	public actsWithMnemonicWithEncryption(): boolean {
		return [
			WalletImportMethod.BIP39.MNEMONIC_WITH_ENCRYPTION,
			WalletImportMethod.BIP44.MNEMONIC_WITH_ENCRYPTION,
			WalletImportMethod.BIP49.MNEMONIC_WITH_ENCRYPTION,
			WalletImportMethod.BIP84.MNEMONIC_WITH_ENCRYPTION,
		].includes(this.data().get(WalletData.ImportMethod)!);
	}

	/** {@inheritDoc IReadWriteWallet.actsWithWif} */
	public actsWithWif(): boolean {
		return this.data().get(WalletData.ImportMethod) === WalletImportMethod.WIF;
	}

	/** {@inheritDoc IReadWriteWallet.actsWithWifWithEncryption} */
	public actsWithWifWithEncryption(): boolean {
		return this.data().get(WalletData.ImportMethod) === WalletImportMethod.WIFWithEncryption;
	}

	#restore(): void {
		const balance: Contracts.WalletBalance | undefined = this.data().get<Contracts.WalletBalance>(
			WalletData.Balance,
		);

		/* istanbul ignore next */
		this.data().set(WalletData.Balance, {
			available: BigNumber.make(balance?.available || 0),
			fees: BigNumber.make(balance?.fees || 0),
		});

		this.data().set(
			WalletData.Sequence,
			BigNumber.make(this.data().get<string>(WalletData.Sequence) || BigNumber.ZERO),
		);
	}
}
