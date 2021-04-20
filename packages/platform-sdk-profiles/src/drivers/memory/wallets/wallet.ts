import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { decrypt, encrypt } from "bip38";
import dot from "dot-prop";
import { decode } from "wif";

import { ExtendedTransactionData } from "../../../dto/transaction";
import { transformTransactionData, transformTransactionDataCollection } from "../../../dto/transaction-mapper";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { KnownWalletService } from "../services/known-wallet-service";
import { DataRepository } from "../../../repositories/data-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { Avatar } from "../../../helpers/avatar";
import { ReadOnlyWallet } from "./read-only-wallet";
import { TransactionService } from "./wallet-transaction-service";
import {
	IPeerRepository,
	IReadWriteWallet,
	IReadOnlyWallet,
	IWalletStruct,
	ProfileSetting,
	WalletData,
	WalletFlag,
	WalletSetting,
	IDelegateService,
	IExchangeRateService,
	IKnownWalletService,
	IDataRepository,
	ISettingRepository,
	ITransactionService,
} from "../../../contracts";
import { ExtendedTransactionDataCollection } from "../../../dto";
import { State } from "../../../environment/state";

interface WalletState {
	id: string;
	restoration: { full: boolean, partial: boolean };
	dataRepository: IDataRepository;
	settingRepository: ISettingRepository;
	transactionService: ITransactionService;
	initial: IWalletStruct;
	coin: Coins.Coin;
	wallet: Contracts.WalletData | undefined;
	address: string;
	publicKey: string | undefined;
	avatar: string;
}

export class Wallet implements IReadWriteWallet {
	/**
	 * The data and instances of the profile.
	 *
	 * @type {WalletState}
	 * @memberof Profile
	 */
	readonly #state: WalletState;

	/**
	 * Creates an instance of Wallet.
	 * @param {string} id
	 * @param {*} initial
	 * @memberof Wallet
	 */
	public constructor(id: string, initial: any = {}) {
		// @ts-ignore
		this.#state = {
			id,
			initial,
			restoration: { full: false, partial: false },
			dataRepository: new DataRepository(),
			settingRepository: new SettingRepository(Object.values(WalletSetting)),
		}

		this.#state.transactionService = new TransactionService(this);

		this.restore();
	}

	/**
	 * These methods serve as helpers to proxy certain method calls to the parent profile.
	 */

	public usesCustomPeer(): boolean {
		return State.profile().usesCustomPeer();
	}

	public usesMultiPeerBroadcasting(): boolean {
		return State.profile().usesMultiPeerBroadcasting();
	}

	public peers(): IPeerRepository {
		return State.profile().peers();
	}

	public getRelays(): string[] {
		return this.peers()
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

		await this.#state.coin.__construct();
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
		return this.#state.coin !== undefined;
	}

	/**
	 * These methods allow to switch out the underlying implementation of certain things like the coin.
	 */

	public async setCoin(
		coin: string,
		network: string,
		options: { sync: boolean } = { sync: true },
	): Promise<IReadWriteWallet> {
		if (this.usesCustomPeer() && this.peers().has(coin, network)) {
			this.#state.coin = State.profile().coins().push(
				coin,
				network,
				{
					peer: this.peers().getRelay(coin, network)?.host,
					peerMultiSignature: this.peers().getMultiSignature(coin, network)?.host,
				},
				true,
			);
		} else {
			this.#state.coin = State.profile().coins().push(coin, network);
		}

		/**
		 * If we fail to construct the coin it means we are having networking
		 * issues or there is a bug in the coin package. This could also mean
		 * bad error handling inside the coin package which needs fixing asap.
		 */
		try {
			if (!this.#state.coin.hasBeenSynchronized()) {
				if (options.sync) {
					await this.#state.coin.__construct();

					this.markAsFullyRestored();
				} else {
					this.markAsPartiallyRestored();
				}
			} else {
				this.markAsFullyRestored();
			}
		} catch {
			this.markAsPartiallyRestored();
		}

		return this;
	}

	public async setIdentity(mnemonic: string): Promise<Wallet> {
		this.#state.address = await this.#state.coin.identity().address().fromMnemonic(mnemonic);
		this.#state.publicKey = await this.#state.coin.identity().publicKey().fromMnemonic(mnemonic);

		return this.setAddress(this.#state.address);
	}

	public async setAddress(
		address: string,
		options: { syncIdentity: boolean; validate: boolean } = { syncIdentity: true, validate: true },
	): Promise<Wallet> {
		if (options.validate) {
			const isValidAddress: boolean = await this.coin().identity().address().validate(address);

			if (!isValidAddress) {
				throw new Error(`Failed to retrieve information for ${address} because it is invalid.`);
			}
		}

		this.#state.address = address;

		if (options.syncIdentity) {
			await this.syncIdentity();
		}

		this.setAvatar(Avatar.make(this.address()));

		return this;
	}

	public setAvatar(value: string): IReadWriteWallet {
		this.#state.avatar = value;

		this.settings().set(WalletSetting.Avatar, value);

		return this;
	}

	public setAlias(alias: string): IReadWriteWallet {
		this.settings().set(WalletSetting.Alias, alias);

		return this;
	}

	/**
	 * These methods serve as getters to the underlying data and dependencies.
	 */

	public hasSyncedWithNetwork(): boolean {
		if (this.#state.wallet === undefined) {
			return false;
		}

		return this.#state.wallet.hasPassed();
	}

	public id(): string {
		return this.#state.id;
	}

	public coin(): Coins.Coin {
		return this.#state.coin;
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
		if (!this.#state.wallet) {
			throw new Error("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#state.wallet.primaryKey();
	}

	public address(): string {
		return this.#state.address;
	}

	public publicKey(): string | undefined {
		return this.#state.publicKey;
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

		return this.#state.avatar;
	}

	public data(): IDataRepository {
		return this.#state.dataRepository;
	}

	public settings(): ISettingRepository {
		return this.#state.settingRepository;
	}

	public toData(): Contracts.WalletData {
		if (!this.#state.wallet) {
			throw new Error("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#state.wallet;
	}

	public toObject(): IWalletStruct {
		if (this.hasBeenPartiallyRestored()) {
			return this.#state.initial;
		}

		this.#state.transactionService.dump();

		const network: Coins.CoinNetwork = this.coin().network().toObject();

		return {
			id: this.id(),
			coin: this.coin().manifest().get<string>("name"),
			network: this.networkId(),
			// We only persist a few settings to prefer defaults from the SDK.
			networkConfig: {
				crypto: {
					slip44: network.crypto.slip44,
				},
				networking: {
					hosts: network.networking.hosts,
					hostsMultiSignature: dot.get(network, "networking.hostsMultiSignature", []),
					hostsArchival: dot.get(network, "networking.hostsArchival", []),
				},
			},
			address: this.address(),
			publicKey: this.publicKey(),
			data: {
				[WalletData.Balance]: this.balance().toFixed(),
				[WalletData.BroadcastedTransactions]: this.data().get(WalletData.BroadcastedTransactions, []),
				[WalletData.Sequence]: this.nonce().toFixed(),
				[WalletData.SignedTransactions]: this.data().get(WalletData.SignedTransactions, []),
				[WalletData.Votes]: this.data().get(WalletData.Votes, []),
				[WalletData.VotesAvailable]: this.data().get(WalletData.VotesAvailable, 0),
				[WalletData.VotesUsed]: this.data().get(WalletData.VotesUsed, 0),
				[WalletData.WaitingForOurSignatureTransactions]: this.data().get(
					WalletData.WaitingForOurSignatureTransactions,
					[],
				),
				[WalletData.WaitingForOtherSignaturesTransactions]: this.data().get(
					WalletData.WaitingForOtherSignaturesTransactions,
					[],
				),
				[WalletData.LedgerPath]: this.data().get(WalletData.LedgerPath),
				[WalletData.Bip38EncryptedKey]: this.data().get(WalletData.Bip38EncryptedKey),
				[WalletFlag.Starred]: this.isStarred(),
			},
			settings: this.settings().all(),
		};
	}

	/**
	 * These methods serve as identifiers for special types of wallets.
	 */

	public knownName(): string | undefined {
		return container.get<KnownWalletService>(Identifiers.KnownWalletService).name(this.networkId(), this.address());
	}

	public secondPublicKey(): string | undefined {
		if (!this.#state.wallet) {
			throw new Error("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#state.wallet.secondPublicKey();
	}

	public username(): string | undefined {
		if (!this.#state.wallet) {
			throw new Error("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#state.wallet.username();
	}

	public isDelegate(): boolean {
		if (!this.#state.wallet) {
			throw new Error("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#state.wallet.isDelegate();
	}

	public isResignedDelegate(): boolean {
		if (!this.#state.wallet) {
			throw new Error("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#state.wallet.isResignedDelegate();
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
		if (!this.#state.wallet) {
			throw new Error("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#state.wallet.isMultiSignature();
	}

	public isSecondSignature(): boolean {
		if (!this.#state.wallet) {
			throw new Error("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#state.wallet.isSecondSignature();
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
		return this.#state.coin.manifest();
	}

	public config(): Coins.Config {
		return this.#state.coin.config();
	}

	public client(): Contracts.ClientService {
		return this.#state.coin.client();
	}

	public dataTransferObject(): Contracts.DataTransferObjectService {
		return this.#state.coin.dataTransferObject();
	}

	public identity(): Contracts.IdentityService {
		return this.#state.coin.identity();
	}

	public ledger(): Contracts.LedgerService {
		return this.#state.coin.ledger();
	}

	public link(): Contracts.LinkService {
		return this.#state.coin.link();
	}

	public message(): Contracts.MessageService {
		return this.#state.coin.message();
	}

	public peer(): Contracts.PeerService {
		return this.#state.coin.peer();
	}

	public transaction(): ITransactionService {
		return this.#state.transactionService;
	}

	public transactionTypes(): Coins.CoinTransactionTypes {
		return this.coin().manifest().get<object>("networks")[this.networkId()].transactionTypes;
	}

	/**
	 * These methods serve as helpers to interact with the underlying coin.
	 */

	public async transactions(
		query: Contracts.ClientTransactionsInput = {},
	): Promise<ExtendedTransactionDataCollection> {
		return this.fetchTransactions({ ...query, addresses: [this.address()] });
	}

	public async sentTransactions(
		query: Contracts.ClientTransactionsInput = {},
	): Promise<ExtendedTransactionDataCollection> {
		return this.fetchTransactions({ ...query, senderId: this.address() });
	}

	public async receivedTransactions(
		query: Contracts.ClientTransactionsInput = {},
	): Promise<ExtendedTransactionDataCollection> {
		return this.fetchTransactions({ ...query, recipientId: this.address() });
	}

	public multiSignature(): Contracts.WalletMultiSignature {
		if (!this.#state.wallet) {
			throw new Error("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#state.wallet.multiSignature();
	}

	public multiSignatureParticipants(): IReadOnlyWallet[] {
		const participants: Record<string, any> | undefined = this.data().get(WalletData.MultiSignatureParticipants);

		if (!participants) {
			throw new Error(
				"This Multi-Signature has not been synchronized yet. Please call [syncMultiSignature] before using it.",
			);
		}

		return this.multiSignature().publicKeys.map((publicKey: string) => new ReadOnlyWallet(participants[publicKey]));
	}

	public entities(): Contracts.Entity[] {
		if (!this.#state.wallet) {
			throw new Error("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#state.wallet.entities();
	}

	public votes(): IReadOnlyWallet[] {
		const votes: string[] | undefined = this.data().get<string[]>(WalletData.Votes);

		if (votes === undefined) {
			throw new Error("The voting data has not been synced. Please call [syncVotes] before accessing votes.");
		}

		return container.get<IDelegateService>(Identifiers.DelegateService).map(this, votes);
	}

	public votesAvailable(): number {
		const result: number | undefined = this.data().get<number>(WalletData.VotesAvailable);

		if (result === undefined) {
			throw new Error("The voting data has not been synced. Please call [syncVotes] before accessing votes.");
		}

		return result;
	}

	public votesUsed(): number {
		const result: number | undefined = this.data().get<number>(WalletData.VotesUsed);

		if (result === undefined) {
			throw new Error("The voting data has not been synced. Please call [syncVotes] before accessing votes.");
		}

		return result;
	}

	public explorerLink(): string {
		return this.link().wallet(this.address());
	}

	/**
	 * These methods serve as helpers to determine if an action can be performed.
	 */

	public canVote(): boolean {
		return this.votesAvailable() > 0;
	}

	public can(feature: string): boolean {
		return this.#state.coin.network().can(feature);
	}

	public canAny(features: string[]): boolean {
		for (const feature of features) {
			if (this.can(feature)) {
				return true;
			}
		}

		return false;
	}

	public canAll(features: string[]): boolean {
		for (const feature of features) {
			if (this.cannot(feature)) {
				return false;
			}
		}

		return true;
	}

	public cannot(feature: string): boolean {
		return this.#state.coin.network().cannot(feature);
	}

	/**
	 * These methods serve as helpers to keep the wallet data updated.
	 */

	public async sync(options: { resetCoin: boolean } = { resetCoin: false }): Promise<void> {
		if (options.resetCoin) {
			this.#state.coin = State.profile().coins().push(this.coinId(), this.networkId(), {}, true);
		}

		await this.setCoin(this.coinId(), this.networkId());
	}

	public async syncIdentity(): Promise<void> {
		const currentWallet = this.#state.wallet;
		const currentPublicKey = this.#state.publicKey;

		try {
			this.#state.wallet = await this.#state.coin.client().wallet(this.address());

			if (!this.#state.publicKey) {
				this.#state.publicKey = this.#state.wallet.publicKey();
			}

			this.data().set(WalletData.Balance, this.#state.wallet.balance());
			this.data().set(WalletData.Sequence, this.#state.wallet.nonce());
		} catch {
			/**
			 * TODO: decide what to do if the wallet couldn't be found
			 *
			 * A missing wallet could mean that the wallet is legitimate
			 * but has no transactions or that the address is wrong.
			 */

			this.#state.wallet = currentWallet;
			this.#state.publicKey = currentPublicKey;
		}
	}

	public async syncMultiSignature(): Promise<void> {
		if (!this.isMultiSignature()) {
			return;
		}

		const participants: Record<string, any> = {};

		for (const publicKey of this.multiSignature().publicKeys) {
			participants[publicKey] = (await this.client().wallet(publicKey)).toObject();
		}

		this.data().set(WalletData.MultiSignatureParticipants, participants);
	}

	public async syncVotes(): Promise<void> {
		const { available, publicKeys, used } = await this.client().votes(this.address());

		this.data().set(WalletData.VotesAvailable, available);
		this.data().set(WalletData.Votes, publicKeys);
		this.data().set(WalletData.VotesUsed, used);
	}

	public async findTransactionById(id: string): Promise<ExtendedTransactionData> {
		return transformTransactionData(this, await this.#state.coin.client().transaction(id));
	}

	/**
	 * Get multiple transactions by their IDs.
	 *
	 * Uses "Promise.all" instead of "Promise.allSettled" to throw when an invalid ID is used.
	 *
	 * @param {string[]} ids
	 * @returns {Promise<ExtendedTransactionData[]>}
	 * @memberof Wallet
	 */
	public async findTransactionsByIds(ids: string[]): Promise<ExtendedTransactionData[]> {
		return Promise.all(ids.map((id: string) => this.findTransactionById(id)));
	}

	/**
	 * If a wallet makes use of a WIF you will need to decrypt it and
	 * pass it the transaction signing service instead of asking the
	 * user for a BIP39 plain text passphrase.
	 *
	 * @see https://github.com/bitcoinjs/bip38
	 */
	public async wif(password: string): Promise<string> {
		const encryptedKey: string | undefined = this.data().get(WalletData.Bip38EncryptedKey);

		if (encryptedKey === undefined) {
			throw new Error("This wallet does not use BIP38 encryption.");
		}

		return this.coin().identity().wif().fromPrivateKey(decrypt(encryptedKey, password).privateKey.toString("hex"));
	}

	public async setWif(mnemonic: string, password: string): Promise<IReadWriteWallet> {
		const { compressed, privateKey } = decode(await this.coin().identity().wif().fromMnemonic(mnemonic));

		this.data().set(WalletData.Bip38EncryptedKey, encrypt(privateKey, compressed, password));

		return this;
	}

	public usesWIF(): boolean {
		return this.data().has(WalletData.Bip38EncryptedKey);
	}

	public markAsFullyRestored(): void {
		this.#state.restoration.full = true;
		this.#state.restoration.partial = false;
	}

	public hasBeenFullyRestored(): boolean {
		return this.#state.restoration.full;
	}

	public markAsPartiallyRestored(): void {
		this.#state.restoration.full = false;
		this.#state.restoration.partial = true;
	}

	public hasBeenPartiallyRestored(): boolean {
		return this.#state.restoration.partial;
	}

	private async fetchTransactions(
		query: Contracts.ClientTransactionsInput,
	): Promise<ExtendedTransactionDataCollection> {
		const result = await this.#state.coin.client().transactions(query);

		for (const transaction of result.items()) {
			transaction.setMeta("address", this.address());
			transaction.setMeta("publicKey", this.publicKey());
		}

		return transformTransactionDataCollection(this, result);
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
