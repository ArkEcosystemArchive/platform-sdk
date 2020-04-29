import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import Web3 from "web3";

import { Delegate, Peer, Transaction, Wallet } from "../dto";

export class ClientService implements Contracts.ClientService {
	static readonly MONTH_IN_SECONDS = 8640 * 30;

	readonly #connection: Web3;

	public constructor (peer: string) {
		this.#connection = new Web3(new Web3.providers.HttpProvider(peer));
	}

	public async getTransaction(id: string): Promise<Transaction> {
		const result = await this.#connection.eth.getTransaction(id);

		return new Transaction(result);
	}

	public async getTransactions(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Transaction>> {
		const endBlock: number = await this.#connection.eth.getBlockNumber();
		const startBlock: number = endBlock - (query?.count ?? Client.MONTH_IN_SECONDS);

		const transactions: Transaction[] = [];
		for (let i = startBlock; i < endBlock; i++) {
			const block = await this.#connection.eth.getBlock(i, true);

			if (block && block.transactions) {
				for (const transaction of block.transactions) {
					if (
						query?.address === "*" ||
						query?.address === transaction.from ||
						query?.address === transaction.to
					) {
						transactions.push(new Transaction(transaction));
					}
				}
			}
		}

		return { meta: {}, data: transactions };
	}

	public async searchTransactions(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Transaction>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<Wallet> {
		const result = await this.#connection.eth.getBalance(id);

		return new Wallet({ address: id, balance: result });
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
		const result = await this.#connection.eth.getGasPrice();

		return { transfer: result };
	}

	public async getSyncStatus(): Promise<boolean> {
		return (await this.#connection.eth.isSyncing()) === false;
	}

	public async postTransactions(transactions: object[]): Promise<void> {
		throw new Exceptions.NotImplemented(this.constructor.name, "postTransactions");
	}
}
