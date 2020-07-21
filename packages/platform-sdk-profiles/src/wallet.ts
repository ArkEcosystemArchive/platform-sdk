import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Avatar } from "./avatar";
import { container } from "./container";
import { Identifiers } from "./container.models";
import { Profile } from "./profile";
import { DataRepository } from "./repositories/data-repository";
import { SettingRepository } from "./repositories/setting-repository";
import { createTransactionDataCollection } from "./transaction.helpers";
import { WalletData, WalletFlag, WalletSetting, WalletStruct } from "./wallet.models";

export class Wallet {
	#dataRepository!: DataRepository;
	#settingRepository!: SettingRepository;

	#profile!: Profile;

	#id!: string;
	#coin!: Coins.Coin;
	#wallet!: Contracts.WalletData;

	#address!: string;
	#publicKey!: string | undefined;
	#avatar!: string;

	public constructor(id: string, profile: Profile) {
		this.#id = id;
		this.#profile = profile;
		this.#dataRepository = new DataRepository();
		this.#settingRepository = new SettingRepository(Object.values(WalletSetting));
	}

	/**
	 * These methods allow to switch out the underlying implementation of certain things like the coin.
	 */

	public async setCoin(coin: Coins.CoinSpec, network: string): Promise<Wallet> {
		this.#coin = await Coins.CoinFactory.make(coin, {
			network,
			httpClient: container.get(Identifiers.HttpClient),
		});

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

	public fiat(): BigNumber {
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

		if (value === undefined) {
			return this.#avatar;
		}

		return value;
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

		return {
			id: this.id(),
			coin: this.coin().manifest().get<string>("name"),
			coinConfig,
			network: this.network().id,
			address: this.address(),
			publicKey: this.publicKey(),
			data: this.data().all(),
			settings: this.settings().all(),
		};
	}

	/**
	 * These methods serve as identifiers for special types of wallets.
	 */

	public isDelegate(): boolean {
		return this.#wallet.isDelegate();
	}

	public isKnown(): boolean {
		return this.#wallet.isKnown();
	}

	public isLedger(): boolean {
		// TODO: automatically determine this
		return this.data().has(WalletFlag.Ledger);
	}

	public isMultiSignature(): boolean {
		return this.#wallet.isMultiSignature();
	}

	public isSecondSignature(): boolean {
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

	public transaction(): Contracts.TransactionService {
		return this.#coin.transaction();
	}

	/**
	 * These methods serve as helpers to keep the wallet data updated.
	 */

	public async syncIdentity(): Promise<void> {
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
		}
	}

	/**
	 * These methods serve as helpers to interact with the underlying coin.
	 */

	public async transactions(
		query: Contracts.ClientTransactionsInput,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		return createTransactionDataCollection(
			await this.#coin.client().transactions({ address: this.address(), ...query }),
			this,
		);
	}

	public async sentTransactions(
		query: Contracts.ClientTransactionsInput,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		return createTransactionDataCollection(
			await this.#coin.client().transactions({ senderId: this.address(), ...query }),
			this,
		);
	}

	public async receivedTransactions(
		query: Contracts.ClientTransactionsInput,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		return createTransactionDataCollection(
			await this.#coin.client().transactions({ recipientId: this.address(), ...query }),
			this,
		);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		return this.#coin.client().wallet(id);
	}

	public async wallets(
		query: Contracts.ClientWalletsInput,
	): Promise<Contracts.CollectionResponse<Coins.WalletDataCollection>> {
		return this.#coin.client().wallets(query);
	}

	public async delegate(id: string): Promise<Contracts.WalletData> {
		return this.#coin.client().delegate(id);
	}

	public async delegates(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Coins.WalletDataCollection>> {
		return this.#coin.client().delegates(query);
	}

	public votes(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		return this.#coin.client().votes(this.address(), query);
	}

	public voters(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Coins.WalletDataCollection>> {
		return this.#coin.client().voters(this.address(), query);
	}

	public async syncing(): Promise<boolean> {
		return this.#coin.client().syncing();
	}

	public async broadcast(transactions: Contracts.SignedTransaction[]): Promise<Contracts.BroadcastResponse> {
		return this.#coin.client().broadcast(transactions);
	}

	/**
	 * These methods serve as helpers to interact with exchange markets.
	 */

	public async updateExchangeRate(): Promise<void> {
		this.data().set(WalletData.ExchangeRate, this.#profile.getExchangeRate(this.currency()));
	}
}
