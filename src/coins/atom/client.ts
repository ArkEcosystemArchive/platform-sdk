import { NotImplemented } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { getJSON, postJSON } from "../../utils/get-json";
import { Client, CollectionResponse } from "../contracts/client";
import { Delegate, Peer, Transaction, Wallet } from "./dto";

export class Atom implements Client {
	readonly #baseUrl: string;

	public constructor(readonly peer: string) {
		this.#baseUrl = peer;
	}

	public async getTransaction(id: string): Promise<any> {
		const response = await this.get(`txs/${id}`);

		return new Transaction(response);
	}

	public async getTransactions(query?: KeyValuePair): Promise<CollectionResponse<Transaction>> {
		const response = await this.get("txs", query);
		console.log(JSON.stringify(response));

		throw new NotImplemented(this.constructor.name, "getTransactions");
	}

	public async searchTransactions(query: KeyValuePair): Promise<CollectionResponse<Transaction>> {
		throw new NotImplemented(this.constructor.name, "getTransactions");
	}

	public async getWallet(id: string): Promise<Wallet> {
		const response = await this.get(`auth/accounts/${id}`);

		throw new NotImplemented(this.constructor.name, "getWallets");
	}

	public async getWallets(query?: KeyValuePair): Promise<CollectionResponse<Wallet>> {
		throw new NotImplemented(this.constructor.name, "getWallets");
	}

	public async searchWallets(query: KeyValuePair): Promise<CollectionResponse<Wallet>> {
		throw new NotImplemented(this.constructor.name, "searchWallets");
	}

	public async getDelegate(id: string): Promise<Delegate> {
		const response = await this.get(`staking/delegators/${id}/delegations`);

		throw new NotImplemented(this.constructor.name, "getWallets");
	}

	public async getDelegates(query?: KeyValuePair): Promise<CollectionResponse<Delegate>> {
		const response = await this.get("staking/redelegations");

		throw new NotImplemented(this.constructor.name, "getWallets");
	}

	public async getPeers(query?: KeyValuePair): Promise<CollectionResponse<Peer>> {
		throw new NotImplemented(this.constructor.name, "getPeers");
	}

	public async getConfiguration(): Promise<any> {
		const response = await this.get("node_info");

		throw new NotImplemented(this.constructor.name, "getConfiguration");
	}

	public async getCryptoConfiguration(): Promise<any> {
		throw new NotImplemented(this.constructor.name, "getCryptoConfiguration");
	}

	public async getFeesByNode(days: number): Promise<any> {
		throw new NotImplemented(this.constructor.name, "getFeesByNode");
	}

	public async getFeesByType(): Promise<any> {
		throw new NotImplemented(this.constructor.name, "getFeesByType");
	}

	public async getSyncStatus(): Promise<any> {
		const response = await this.get("syncing");

		throw new NotImplemented(this.constructor.name, "getSyncStatus");
	}

	public async postTransactions(transactions: object[]): Promise<any> {
		for (const transaction of transactions) {
			await this.post("tx", { tx: transaction });
		}
	}

	private async get(path: string, query?: KeyValuePair): Promise<any> {
		return getJSON(`${this.#baseUrl}/${path}`, query);
	}

	private async post(path: string, body: KeyValuePair): Promise<any> {
		return postJSON(this.#baseUrl, path, body);
	}
}
