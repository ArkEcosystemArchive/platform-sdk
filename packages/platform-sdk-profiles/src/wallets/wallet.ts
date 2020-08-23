import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { transformTransactionData } from "../dto/transaction-mapper";
import { makeCoin } from "../environment/container.helpers";
import { Profile } from "../profiles/profile";
import { DataRepository } from "../repositories/data-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { Avatar } from "../services/avatar";
import { EntityRegistrationAggregate } from "./aggregates/entity-registration-aggregate";
import { EntityResignationAggregate } from "./aggregates/entity-resignation-aggregate";
import { EntityUpdateAggregate } from "./aggregates/entity-update-aggregate";
import { DelegateMapper } from "./mappers/delegate-mapper";
import { ReadOnlyWallet } from "./read-only-wallet";
import { TransactionService } from "./wallet-transaction-service";
import { ReadWriteWallet, WalletData, WalletFlag, WalletSetting, WalletStruct } from "./wallet.models";

export class Wallet implements ReadWriteWallet {
	readonly #entityRegistrationAggregate: EntityRegistrationAggregate;
	readonly #entityResignationAggregate: EntityResignationAggregate;
	readonly #entityUpdateAggregate: EntityUpdateAggregate;

	readonly #dataRepository: DataRepository;
	readonly #settingRepository: SettingRepository;
	readonly #transactionService: TransactionService;

	readonly #profile: Profile;

	readonly #id: string;
	#coin!: Coins.Coin;
	#wallet: Contracts.WalletData | undefined;

	#address!: string;
	#publicKey!: string | undefined;
	#avatar!: string;

	public constructor(id: string, profile: Profile) {
		this.#id = id;
		this.#profile = profile;
		this.#dataRepository = new DataRepository();
		this.#settingRepository = new SettingRepository(Object.values(WalletSetting));
		this.#transactionService = new TransactionService(this);

		this.#entityRegistrationAggregate = new EntityRegistrationAggregate(this);
		this.#entityResignationAggregate = new EntityResignationAggregate(this);
		this.#entityUpdateAggregate = new EntityUpdateAggregate(this);

		this.restore();
	}

	/**
	 * These methods allow to switch out the underlying implementation of certain things like the coin.
	 */

	public async setCoin(coin: string, network: string): Promise<Wallet> {
		this.#coin = await makeCoin(coin, network);

		return this;
	}

	/**
	 * @TODO
	 *
	 * Think about how to remove this method. We need async methods instead of a
	 * constructor because of the network requests and different ways to import wallets.
	 */
	public async setIdentity(mnemonic: string): Promise<Wallet> {
		this.#address = await this.#coin.identity().address().fromMnemonic(mnemonic);
		this.#publicKey = await this.#coin.identity().publicKey().fromMnemonic(mnemonic);

		return this.setAddress(this.#address);
	}

	/**
	 * @TODO
	 *
	 * Think about how to remove this method. We need async methods instead of a
	 * constructor because of the network requests and different ways to import wallets.
	 */
	public async setAddress(address: string): Promise<Wallet> {
		const isValidAddress: boolean = await this.coin().identity().address().validate(address);

		if (!isValidAddress) {
			throw new Error(`Failed to retrieve information for ${address} because it is invalid.`);
		}

		this.#address = address;

		await this.syncIdentity();

		this.setAvatar(Avatar.make(this.address()));

		return this;
	}

	public setAvatar(value: string): Wallet {
		this.#avatar = value;

		this.settings().set(WalletSetting.Avatar, value);

		return this;
	}

	/**
	 * These methods serve as getters to the underlying data and dependencies.
	 */

	public hasSyncedWithNetwork(): boolean {
		if (this.#wallet === undefined) {
			return false;
		}

		return this.#wallet.hasPassed();
	}

	public id(): string {
		return this.#id;
	}

	public coin(): Coins.Coin {
		return this.#coin;
	}

	public network(): Coins.CoinNetwork {
		return this.#coin.network();
	}

	public currency(): string {
		return this.network().currency.ticker;
	}

	public alias(): string | undefined {
		return this.settings().get(WalletSetting.Alias);
	}

	public address(): string {
		return this.#address;
	}

	public publicKey(): string | undefined {
		return this.#publicKey;
	}

	public balance(): BigNumber {
		const value: string | undefined = this.data().get(WalletData.Balance);

		if (value === undefined) {
			return BigNumber.ZERO;
		}

		return BigNumber.make(value);
	}

	public convertedBalance(): BigNumber {
		const value: string | undefined = this.data().get(WalletData.ExchangeRate);

		if (value === undefined) {
			return BigNumber.ZERO;
		}

		return this.balance().times(value);
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

		return this.#avatar;
	}

	public data(): DataRepository {
		return this.#dataRepository;
	}

	public settings(): SettingRepository {
		return this.#settingRepository;
	}

	public toObject(): WalletStruct {
		const coinConfig: any = { ...this.coin().config().all() };
		delete coinConfig.httpClient;

		this.#transactionService.dump();

		return {
			id: this.id(),
			coin: this.coin().manifest().get<string>("name"),
			coinConfig,
			network: this.network().id,
			address: this.address(),
			publicKey: this.publicKey(),
			data: {
				[WalletData.Balance]: this.balance().toFixed(),
				[WalletData.BroadcastedTransactions]: this.data().get(WalletData.BroadcastedTransactions, []),
				[WalletData.ExchangeRate]: this.data().get(WalletData.ExchangeRate, 0),
				[WalletData.Sequence]: this.nonce().toFixed(),
				[WalletData.SignedTransactions]: this.data().get(WalletData.SignedTransactions, []),
				[WalletData.Votes]: this.data().get(WalletData.Votes, []),
				[WalletData.VotesAvailable]: this.data().get(WalletData.VotesAvailable, 0),
				[WalletData.VotesUsed]: this.data().get(WalletData.VotesUsed, 0),
			},
			settings: this.settings().all(),
		};
	}

	/**
	 * These methods serve as identifiers for special types of wallets.
	 */

	public isDelegate(): boolean {
		if (!this.#wallet) {
			throw new Error("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#wallet.isDelegate();
	}

	public isKnown(): boolean {
		if (!this.#wallet) {
			throw new Error("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#wallet.isKnown();
	}

	public isLedger(): boolean {
		// TODO: automatically determine this
		return this.data().has(WalletFlag.Ledger);
	}

	public isMultiSignature(): boolean {
		if (!this.#wallet) {
			throw new Error("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#wallet.isMultiSignature();
	}

	public isSecondSignature(): boolean {
		if (!this.#wallet) {
			throw new Error("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
		}

		return this.#wallet.isSecondSignature();
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
		// TODO: make this non-nullable
		return this.manifest().get<string>("name")!;
	}

	public networkId(): string {
		return this.network().id;
	}

	public manifest(): Coins.Manifest {
		return this.#coin.manifest();
	}

	public config(): Coins.Config {
		return this.#coin.config();
	}

	public guard(): Coins.Guard {
		return this.#coin.guard();
	}

	public client(): Contracts.ClientService {
		return this.#coin.client();
	}

	public fee(): Contracts.FeeService {
		return this.#coin.fee();
	}

	public identity(): Contracts.IdentityService {
		return this.#coin.identity();
	}

	public ledger(): Contracts.LedgerService {
		return this.#coin.ledger();
	}

	public link(): Contracts.LinkService {
		return this.#coin.link();
	}

	public message(): Contracts.MessageService {
		return this.#coin.message();
	}

	public peer(): Contracts.PeerService {
		return this.#coin.peer();
	}

	public transaction(): TransactionService {
		return this.#transactionService;
	}

	/**
	 * These methods serve as helpers to interact with the underlying coin.
	 */

	public async transactions(query: Contracts.ClientTransactionsInput = {}): Promise<Coins.TransactionDataCollection> {
		return this.fetchTransaction({ addresses: [this.address()], ...query });
	}

	public async sentTransactions(
		query: Contracts.ClientTransactionsInput = {},
	): Promise<Coins.TransactionDataCollection> {
		return this.fetchTransaction({ senderId: this.address(), ...query });
	}

	public async receivedTransactions(
		query: Contracts.ClientTransactionsInput = {},
	): Promise<Coins.TransactionDataCollection> {
		return this.fetchTransaction({ recipientId: this.address(), ...query });
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		return this.#coin.client().wallet(id);
	}

	public async wallets(query: Contracts.ClientWalletsInput): Promise<Coins.WalletDataCollection> {
		return this.#coin.client().wallets(query);
	}

	public async delegate(id: string): Promise<Contracts.WalletData> {
		return this.#coin.client().delegate(id);
	}

	public async delegates(query?: Contracts.KeyValuePair): Promise<Coins.WalletDataCollection> {
		return this.#coin.client().delegates(query);
	}

	public votes(): ReadOnlyWallet[] {
		const votes: string[] | undefined = this.data().get<string[]>(WalletData.Votes);

		if (votes === undefined) {
			throw new Error("The voting data has not been synced. Please call [syncVotes] before accessing votes.");
		}

		return DelegateMapper.execute(this.coinId(), this.networkId(), votes);
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

	public voters(query?: Contracts.KeyValuePair): Promise<Coins.WalletDataCollection> {
		return this.#coin.client().voters(this.address(), query);
	}

	public async syncing(): Promise<boolean> {
		return this.#coin.client().syncing();
	}

	/**
	 * These methods serve as helpers to determine if an action can be performed.
	 */

	public canVote(): boolean {
		return this.votesAvailable() > 0;
	}

	/**
	 * These methods serve as helpers to aggregate commonly used data.
	 */

	public entityRegistrationAggregate(): EntityRegistrationAggregate {
		return this.#entityRegistrationAggregate;
	}

	public entityResignationAggregate(): EntityResignationAggregate {
		return this.#entityResignationAggregate;
	}

	public entityUpdateAggregate(): EntityUpdateAggregate {
		return this.#entityUpdateAggregate;
	}

	/**
	 * These methods serve as helpers to keep the wallet data updated.
	 */

	public async syncIdentity(): Promise<void> {
		const currentWallet = this.#wallet;
		const currentPublicKey = this.#publicKey;

		try {
			this.#wallet = await this.#coin.client().wallet(this.address());

			if (!this.#publicKey) {
				this.#publicKey = this.#wallet.publicKey();
			}

			this.data().set(WalletData.Balance, this.#wallet.balance());
			this.data().set(WalletData.Sequence, this.#wallet.nonce());
		} catch {
			/**
			 * TODO: decide what to do if the wallet couldn't be found
			 *
			 * A missing wallet could mean that the wallet is legitimate
			 * but has no transactions or that the address is wrong.
			 */

			this.#wallet = currentWallet;
			this.#publicKey = currentPublicKey;
		}
	}

	public async syncVotes(): Promise<void> {
		try {
			const { available, publicKeys, used } = await this.client().votes(this.address());

			this.data().set(WalletData.VotesAvailable, available);
			this.data().set(WalletData.Votes, publicKeys);
			this.data().set(WalletData.VotesUsed, used);
		} catch {
			if (this.data().has(WalletData.Votes)) {
				this.data().forget(WalletData.Votes);
			}
		}
	}

	public async syncExchangeRate(): Promise<void> {
		this.data().set(WalletData.ExchangeRate, await this.#profile.getExchangeRate(this.currency()));
	}

	private async fetchTransaction(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		const result = await this.#coin.client().transactions(query);

		for (const transaction of result.items()) {
			transaction.setMeta("address", this.address());
			transaction.setMeta("publicKey", this.publicKey());
		}

		result.transform((transaction: Contracts.TransactionDataType) => transformTransactionData(this, transaction));

		return result;
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
