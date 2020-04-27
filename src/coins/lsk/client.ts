import { NotImplemented } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { getJSON, postJSON } from "../../utils/get-json";
import { Client, CollectionResponse } from "../contracts/client";
import { Block, Delegate, Peer, Transaction, Wallet } from "./dto";

export class Lisk implements Client {
	readonly #baseUrl: string;

	public constructor(private readonly peer: string) {
		this.#baseUrl = peer;
	}

	public async getTransaction(id: string): Promise<Transaction> {
		const result = await this.get("transactions", { id });

		return new Transaction(result.data[0]);
	}

	public async getTransactions(query?: KeyValuePair): Promise<CollectionResponse<Transaction>> {
		const result = await this.get("transactions", query);

		return { meta: result.meta, data: result.data.map((transaction) => new Transaction(transaction)) };
	}

	public async searchTransactions(query: KeyValuePair): Promise<CollectionResponse<Transaction>> {
		throw new NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<Wallet> {
		const result = await this.get("accounts", { address: id });

		return new Wallet(result.data[0]);
	}

	public async getWallets(query?: KeyValuePair): Promise<CollectionResponse<Wallet>> {
		const result = await this.get("accounts", query);

		return { meta: result.meta, data: result.data.map((wallet) => new Wallet(wallet)) };
	}

	public async searchWallets(query: KeyValuePair): Promise<CollectionResponse<Wallet>> {
		throw new NotImplemented(this.constructor.name, "searchWallets");
	}

	public async getDelegate(id: string): Promise<Delegate> {
		const result = await this.get("delegates", { username: id });

		return new Delegate(result.data[0]);
	}

	public async getDelegates(query?: KeyValuePair): Promise<CollectionResponse<Delegate>> {
		const result = await this.get("delegates");

		return { meta: result.meta, data: result.data.map((wallet) => new Delegate(wallet)) };
	}

	public async getPeers(query?: KeyValuePair): Promise<CollectionResponse<Peer>> {
		const result = await this.get("peers", query);

		return { meta: result.meta, data: result.data.map((peer) => new Peer(peer)) };
	}

	public async getConfiguration(): Promise<any> {
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
		throw new NotImplemented(this.constructor.name, "getSyncStatus");
	}

	public async postTransactions(transaction: object): Promise<any> {
		try {
			await this.post("transactions", transaction);
		} catch (e) {
			throw new Error((await e.responseBody).toString());
		}
	}

	private async get(path: string, query?: KeyValuePair): Promise<any> {
		return getJSON(`${this.#baseUrl}/api/${path}`, query);
	}

	private async post(path: string, body: KeyValuePair): Promise<any> {
		return postJSON(`${this.#baseUrl}/api/`, path, body);
	}
}
