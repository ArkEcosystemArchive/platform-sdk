import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import { RippleAPI } from "ripple-lib";

import { DelegateData, TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #connection: RippleAPI;
	readonly #dataUrl: string = "https://data.ripple.com/v2";

	private constructor(connection: RippleAPI) {
		this.#connection = connection;
	}

	public static async new(peer: string, connect = true) {
		const connection = new RippleAPI({ server: peer });

		if (connect) {
			await connection.connect();
		}

		return new ClientService(connection);
	}

	public async getTransaction(id: string): Promise<TransactionData> {
		const { transaction } = await this.get(`transactions/${id}`);

		return new TransactionData(transaction);
	}

	public async getTransactions(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<TransactionData>> {
		const { transactions } = await this.get(`accounts/${query.address}/transactions`, { type: "Payment" });

		return { meta: {}, data: transactions.map((transaction) => new TransactionData(transaction)) };
	}

	public async searchTransactions(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<WalletData> {
		const { account_data } = await this.get(`accounts/${id}`);
		const { balances } = await this.get(`accounts/${id}/balances`, { currency: "XRP" });
		const balance = balances.find((balance) => balance.currency === "XRP");

		return new WalletData({ ...account_data, ...{ balance: balance.value } });
	}

	public async getWallets(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<WalletData>> {
		const { accounts } = await this.get("accounts");

		return { meta: {}, data: accounts.map((account) => new WalletData(account)) };
	}

	public async searchWallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchWallets");
	}

	public async getDelegate(id: string): Promise<DelegateData> {
		return new DelegateData(await this.get(`network/validators/${id}`));
	}

	public async getDelegates(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<DelegateData>> {
		const { validators } = await this.get("network/validators");

		return { meta: {}, data: validators.map((account) => new DelegateData(account)) };
	}

	public async getConfiguration(): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getConfiguration");
	}

	public async getCryptoConfiguration(): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getCryptoConfiguration");
	}

	public async getFeesByNode(days: number): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getFeesByNode");
	}

	public async getFeesByType(): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getFeesByType");
	}

	public async getSyncStatus(): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getSyncStatus");
	}

	public async postTransactions(transactions: any[]): Promise<void> {
		for (const transaction of transactions) {
			await this.#connection.submit(transaction);
		}
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.getJSON(`${this.dataUrl}/${path}`, query);
	}
}
