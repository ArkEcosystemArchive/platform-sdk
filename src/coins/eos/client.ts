import Web3 from "web3";

import { NotImplemented } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { Client, CollectionResponse } from "../contracts/client";
import { Block, Delegate, Peer, Transaction, Wallet } from "./dto";

export class Ethereum implements Client {
	readonly #connection: Web3;

	public constructor(peer: string) {
		this.#connection = new Web3(new Web3.providers.HttpProvider(peer));
	}

	public async getTransaction(id: string): Promise<Transaction> {
		const result = await this.#connection.eth.getTransaction(id);

		return new Transaction(result);
	}

	public async getTransactions(query?: KeyValuePair): Promise<CollectionResponse<Transaction>> {
		throw new NotImplemented(this.constructor.name, "getTransactions");
	}

	public async searchTransactions(query: KeyValuePair): Promise<CollectionResponse<Transaction>> {
		throw new NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<Wallet> {
		const result = await this.#connection.eth.getBalance(id);

		return new Wallet({ address: id, balance: result });
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
		const result = await this.#connection.eth.getGasPrice();

		return result;
	}

	public async getSyncStatus(): Promise<any> {
		const result = await this.#connection.eth.isSyncing();

		return result;
	}

	public async postTransactions(transactions: object[]): Promise<any> {
		throw new NotImplemented(this.constructor.name, "postTransactions");
	}
}
