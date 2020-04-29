import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";

import { Delegate, Peer, Transaction, Wallet } from "../dto";

export class Client implements Contracts.Client {
	readonly #baseUrl: string;

	public constructor (readonly peer: string) {
		this.#baseUrl = peer;
	}

	public async getTransaction(id: string): Promise<Transaction> {
		const response = await this.get(`txs/${id}`);

		return new Transaction(response);
	}

	public async getTransactions(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Transaction>> {
		const response = await this.get("txs", query);
		console.log(JSON.stringify(response));

		throw new Exceptions.NotImplemented(this.constructor.name, "getTransactions");
	}

	public async searchTransactions(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Transaction>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<Wallet> {
		const response = await this.get(`auth/accounts/${id}`);

		throw new Exceptions.NotImplemented(this.constructor.name, "getWallet");
	}

	public async getWallets(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Wallet>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getWallets");
	}

	public async searchWallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Wallet>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchWallets");
	}

	public async getDelegate(id: string): Promise<Delegate> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getDelegate");
	}

	public async getDelegates(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Delegate>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getDelegates");
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
		const { syncing } = await this.get("syncing");

		return syncing;
	}

	public async postTransactions(transactions: object[]): Promise<void> {
		for (const transaction of transactions) {
			await this.post("tx", { tx: transaction });
		}
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.getJSON(`${this.#baseUrl}/${path}`, query);
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.postJSON(this.#baseUrl, path, body);
	}
}
