import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";

import { Delegate, Peer, Transaction, Wallet } from "./dto";

export class Client implements Contracts.Client {
	readonly #baseUrl: string;

	public constructor (private readonly peer: string) {
		this.#baseUrl = peer;
	}

	public async getTransaction(id: string): Promise<Transaction> {
		const result = await this.get("transactions", { id });

		return new Transaction(result.data[0]);
	}

	public async getTransactions(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Transaction>> {
		const result = await this.get("transactions", query);

		return { meta: result.meta, data: result.data.map((transaction) => new Transaction(transaction)) };
	}

	public async searchTransactions(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Transaction>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<Wallet> {
		const result = await this.get("accounts", { address: id });

		return new Wallet(result.data[0]);
	}

	public async getWallets(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Wallet>> {
		const result = await this.get("accounts", query);

		return { meta: result.meta, data: result.data.map((wallet) => new Wallet(wallet)) };
	}

	public async searchWallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Wallet>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchWallets");
	}

	public async getDelegate(id: string): Promise<Delegate> {
		const result = await this.get("delegates", { username: id });

		return new Delegate(result.data[0]);
	}

	public async getDelegates(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Delegate>> {
		const result = await this.get("delegates");

		return { meta: result.meta, data: result.data.map((wallet) => new Delegate(wallet)) };
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

	public async postTransactions(transaction: object): Promise<void> {
		try {
			await this.post("transactions", transaction);
		} catch (e) {
			throw new Error((await e.responseBody).toString());
		}
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.getJSON(`${this.#baseUrl}/api/${path}`, query);
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.postJSON(`${this.#baseUrl}/api/`, path, body);
	}
}
