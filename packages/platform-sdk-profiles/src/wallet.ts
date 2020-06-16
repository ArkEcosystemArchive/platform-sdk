import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Avatar } from "./avatar";
import { container } from "./container";
import { Identifiers, WalletStruct } from "./contracts";
import { WalletSetting } from "./enums";
import { DataRepository } from "./repositories/data-repository";
import { SettingRepository } from "./repositories/setting-repository";

export class Wallet {
	#dataRepository!: DataRepository;
	#settingRepository!: SettingRepository;

	#id!: string;
	#coin!: Coins.Coin;
	#wallet!: Contracts.WalletData;
	#avatar!: string;

	public constructor(id: string) {
		this.#id = id;
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

	public async setIdentity(mnemonic: string): Promise<Wallet> {
		return this.setAddress(await this.#coin.identity().address().fromMnemonic(mnemonic));
	}

	public async setAddress(address: string): Promise<Wallet> {
		this.#wallet = await this.#coin.client().wallet(address);

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

	public network(): string {
		return this.#coin.network().id;
	}

	public avatar(): string {
		// TODO: get either the setting or default avatar
		return this.#avatar;
	}

	public address(): string {
		return this.#wallet.address();
	}

	public publicKey(): string | undefined {
		return this.#wallet.publicKey();
	}

	public balance(): BigNumber {
		return this.#wallet.balance();
	}

	public nonce(): BigNumber {
		return this.#wallet.nonce();
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
			network: this.network(),
			address: this.address(),
			publicKey: this.publicKey(),
			data: this.data().all(),
			settings: this.settings().all(),
		};
	}

	/**
	 * All methods below this line are convenience methods that serve as proxies to the underlying coin implementation.
	 *
	 * The purpose of these methods is to reduce duplication and prevent consumers from implementing
	 * convoluted custom implementations that deviate from how things should be used.
	 *
	 * Any changes in how things need to be handled by consumers should be made in this package!
	 */

	public transactions(
		query: Contracts.ClientTransactionsInput,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		return this.#coin.client().transactions({ address: this.address(), ...query });
	}

	public sentTransactions(
		query: Contracts.ClientTransactionsInput,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		return this.#coin.client().transactions({ senderId: this.address(), ...query });
	}

	public receivedTransactions(
		query: Contracts.ClientTransactionsInput,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		return this.#coin.client().transactions({ recipientId: this.address(), ...query });
	}

	public votes(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		return this.#coin.client().votes(this.address(), query);
	}

	public voters(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Coins.WalletDataCollection>> {
		return this.#coin.client().voters(this.address(), query);
	}

	public createTransfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().transfer(input, options);
	}

	public createSecondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().secondSignature(input, options);
	}

	public createDelegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().delegateRegistration(input, options);
	}

	public createVote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().vote(input, options);
	}

	public createMultiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().multiSignature(input, options);
	}

	public createIpfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().ipfs(input, options);
	}

	public createMultiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().multiPayment(input, options);
	}

	public createDelegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().delegateResignation(input, options);
	}

	public createHtlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().htlcLock(input, options);
	}

	public createHtlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().htlcClaim(input, options);
	}

	public createHtlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().htlcRefund(input, options);
	}

	public createBusinessRegistration(
		input: Contracts.BusinessRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().businessRegistration(input, options);
	}

	public createBusinessResignation(
		input: Contracts.BusinessResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().businessResignation(input, options);
	}

	public createBusinessUpdate(
		input: Contracts.BusinessUpdateInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().businessUpdate(input, options);
	}

	public createBridgechainRegistration(
		input: Contracts.BridgechainRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().bridgechainRegistration(input, options);
	}

	public createBridgechainResignation(
		input: Contracts.BridgechainResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().bridgechainResignation(input, options);
	}

	public createBridgechainUpdate(
		input: Contracts.BridgechainUpdateInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#coin.transaction().bridgechainUpdate(input, options);
	}

	public getVersionFromLedger(): Promise<string> {
		return this.#coin.ledger().getVersion();
	}

	public getPublicKeyFromLedger(path: string): Promise<string> {
		return this.#coin.ledger().getPublicKey(path);
	}

	public signTransactionWithLedger(path: string, payload: Buffer): Promise<string> {
		return this.#coin.ledger().signTransaction(path, payload);
	}

	public signTransactionWithLedgerUsingSchnorr(path: string, payload: Buffer): Promise<string> {
		return this.#coin.ledger().signTransactionWithSchnorr(path, payload);
	}

	public signMessageWithLedger(path: string, payload: Buffer): Promise<string> {
		return this.#coin.ledger().signMessage(path, payload);
	}

	public signMessageWithLedgerUsingSchnorr(path: string, payload: Buffer): Promise<string> {
		return this.#coin.ledger().signMessageWithSchnorr(path, payload);
	}
}
