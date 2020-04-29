import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";

import { DelegateData, TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #baseUrl: string;

	public constructor (private readonly peer: string) {
		this.#baseUrl = peer;
	}

	public async getTransaction(id: string): Promise<TransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getTransaction");
	}

	public async getTransactions(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getTransactions");
	}

	public async searchTransactions(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<WalletData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getWallet");
	}

	public async getWallets(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getWallets");
	}

	public async searchWallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchWallets");
	}

	public async getDelegate(id: string): Promise<DelegateData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getDelegate");
	}

	public async getDelegates(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<DelegateData>> {
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
		throw new Exceptions.NotImplemented(this.constructor.name, "getSyncStatus");
	}

	public async postTransactions(transaction: object): Promise<void> {
		throw new Exceptions.NotImplemented(this.constructor.name, "postTransactions");
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.getJSON(`${this.#baseUrl}/api/${path}`, query);
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.postJSON(`${this.#baseUrl}/api/`, path, body);
	}
}
