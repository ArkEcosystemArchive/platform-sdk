import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import TronWeb from "tronweb";

import { Delegate, Peer, Transaction, Wallet } from "./dto";

export class Client implements Contracts.Client {
	readonly #connection: TronWeb;

	public constructor (peer: string) {
		this.#connection = new TronWeb({
			fullHost: peer,
		});
	}

	public async getTransaction(id: string): Promise<Transaction> {
		const result = await this.#connection.trx.getTransaction(id);

		return new Transaction(result);
	}

	public async getTransactions(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Transaction>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getTransactions");
	}

	public async searchTransactions(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Transaction>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<Wallet> {
		const result = await this.#connection.trx.getAccount(id);

		return new Wallet(result);
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
		throw new Exceptions.NotImplemented(this.constructor.name, "getSyncStatus");
	}

	public async postTransactions(transactions: object[]): Promise<void> {
		for (const transaction of transactions) {
			await this.#connection.trx.sendRawTransaction(transaction);
		}
	}
}
