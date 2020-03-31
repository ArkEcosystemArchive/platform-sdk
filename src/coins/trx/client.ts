import TronWeb from "tronweb";

import { NotImplemented } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { Client, CollectionResponse } from "../contracts/client";
import { Block, Delegate, Peer, Transaction, Wallet } from "./dto";

export class Tron implements Client {
	readonly #connection: TronWeb;

	public constructor(peer: string) {
		this.#connection = new TronWeb({
			fullHost: peer,
		});
	}

	public async getBlock(id: string): Promise<Block> {
		const result = await this.#connection.trx.getBlock(id);

		return new Block(result);
	}

	public async getBlocks(query?: KeyValuePair): Promise<CollectionResponse<Block>> {
		throw new NotImplemented(this.constructor.name, "getBlocks");
	}

	public async searchBlocks(query: KeyValuePair): Promise<CollectionResponse<Block>> {
		throw new NotImplemented(this.constructor.name, "searchBlocks");
	}

	public async getTransaction(id: string): Promise<Transaction> {
		const result = await this.#connection.trx.getTransaction(id);

		return new Transaction(result);
	}

	public async getTransactions(query?: KeyValuePair): Promise<CollectionResponse<Transaction>> {
		throw new NotImplemented(this.constructor.name, "getTransactions");
	}

	public async searchTransactions(query: KeyValuePair): Promise<CollectionResponse<Transaction>> {
		throw new NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<Wallet> {
		const result = await this.#connection.trx.getAccount(id);

		return new Wallet(result);
	}

	public async getWallets(query?: KeyValuePair): Promise<CollectionResponse<Wallet>> {
		throw new NotImplemented(this.constructor.name, "getWallets");
	}

	public async searchWallets(query: KeyValuePair): Promise<CollectionResponse<Wallet>> {
		throw new NotImplemented(this.constructor.name, "searchWallets");
	}

	public async getDelegate(id: string): Promise<Delegate> {
		throw new NotImplemented(this.constructor.name, "getDelegate");
	}

	public async getDelegates(query?: KeyValuePair): Promise<CollectionResponse<Delegate>> {
		throw new NotImplemented(this.constructor.name, "getDelegates");
	}

	public async getPeers(query?: KeyValuePair): Promise<CollectionResponse<Peer>> {
		throw new NotImplemented(this.constructor.name, "getPeers");
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

	public async getBridgechainsByBusiness(address: string, query?: KeyValuePair): Promise<any> {
		throw new NotImplemented(this.constructor.name, "getBridgechainsByBusiness");
	}

	public async postTransactions(transactions: any[]): Promise<any> {
		for (const transaction of transactions) {
			await this.#connection.trx.sendRawTransaction(transaction);
		}
	}
}
