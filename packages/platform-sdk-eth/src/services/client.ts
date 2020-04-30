import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import Web3 from "web3";

import { DelegateData, TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	static readonly MONTH_IN_SECONDS = 8640 * 30;

	readonly #connection: Web3;

	public constructor(peer: string) {
		this.#connection = new Web3(new Web3.providers.HttpProvider(peer));
	}

	public async getTransaction(id: string): Promise<Contracts.TransactionData> {
		const result = await this.#connection.eth.getTransaction(id);

		return new TransactionData(result);
	}

	public async getTransactions(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		const endBlock: number = await this.#connection.eth.getBlockNumber();
		const startBlock: number = endBlock - (query?.count ?? ClientService.MONTH_IN_SECONDS);

		const transactions: TransactionData[] = [];
		for (let i = startBlock; i < endBlock; i++) {
			const block = await this.#connection.eth.getBlock(i, true);

			if (block && block.transactions) {
				for (const transaction of block.transactions) {
					if (
						query?.address === "*" ||
						query?.address === transaction.from ||
						query?.address === transaction.to
					) {
						transactions.push(new TransactionData(transaction));
					}
				}
			}
		}

		return { meta: {}, data: transactions };
	}

	public async searchTransactions(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<Contracts.WalletData> {
		const result = await this.#connection.eth.getBalance(id);

		return new WalletData({ address: id, balance: result });
	}

	public async getWallets(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getWallets");
	}

	public async searchWallets(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchWallets");
	}

	public async getDelegate(id: string): Promise<Contracts.DelegateData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getDelegate");
	}

	public async getDelegates(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.DelegateData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getDelegates");
	}

	public async getVotes(id: string): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getVotes");
	}

	public async getVoters(id: string): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getVoters");
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
