import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";

import { DelegateData, TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #baseUrl: string;

	readonly #restUrl: string = "https://blockchain.info";

	public constructor(peer: string) {
		this.#baseUrl = peer;
	}

	public async getTransaction(id: string): Promise<Contracts.TransactionData> {
		// const response = await this.post("gettransaction", { txid: id });
		const response = await this.get(`rawtx/${id}`, { format: "json" });

		return new TransactionData(response);
	}

	public async getTransactions(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getTransactions");
	}

	public async searchTransactions(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<Contracts.WalletData> {
		const response = await this.get(`rawaddr/${id}`);

		return new WalletData(response);
	}

	public async getWallets(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getWallets");
	}

	public async searchWallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchWallets");
	}

	public async getDelegate(id: string): Promise<Contracts.DelegateData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getDelegate");
	}

	public async getDelegates(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.DelegateData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getDelegates");
	}

	public async getVotes(id: string): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getVotes");
	}

	public async getVoters(id: string): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getVoters");
	}

	public async getConfiguration(): Promise<Contracts.KeyValuePair> {
		const response = await this.post("getnetworkinfo");

		throw new Exceptions.NotImplemented(this.constructor.name, "searchBlocks");
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

	public async postTransactions(transactions: object[]): Promise<void> {
		throw new Exceptions.NotImplemented(this.constructor.name, "postTransactions");
	}

	private async get(path: string, query: Contracts.KeyValuePair = {}): Promise<Contracts.KeyValuePair> {
		return Utils.getJSON(`${this.#restUrl}/${path}`, query);
	}

	private async post(method: string, params: Contracts.KeyValuePair = {}): Promise<Contracts.KeyValuePair> {
		return Utils.postJSON(this.#baseUrl, "/", {
			jsonrpc: "2.0",
			method,
			params,
		});
	}
}
