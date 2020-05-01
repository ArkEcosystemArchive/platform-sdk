import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import Web3 from "web3";

import { DelegateData, TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	static readonly MONTH_IN_SECONDS = 8640 * 30;

	readonly #connection: Web3;

	private constructor(peer: string) {
		this.#connection = new Web3(new Web3.providers.HttpProvider(peer));
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<ClientService> {
		return new ClientService(opts.peer);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transaction(id: string): Promise<Contracts.TransactionData> {
		const result = await this.#connection.eth.getTransaction(id);

		return new TransactionData(result);
	}

	public async transactions(
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

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const result = await this.#connection.eth.getBalance(id);

		return new WalletData({ address: id, balance: result });
	}

	public async wallets(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wallets");
	}

	public async delegate(id: string): Promise<Contracts.DelegateData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegate");
	}

	public async delegates(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.DelegateData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegates");
	}

	public async votes(id: string): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "votes");
	}

	public async voters(id: string): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "voters");
	}

	public async configuration(): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "configuration");
	}

	public async cryptoConfiguration(): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "cryptoConfiguration");
	}

	public async feesByNode(days: number): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "feesByNode");
	}

	public async feesByType(): Promise<Contracts.KeyValuePair> {
		const result = await this.#connection.eth.getGasPrice();

		return { transfer: result };
	}

	public async syncing(): Promise<boolean> {
		return (await this.#connection.eth.isSyncing()) === false;
	}

	public async broadcast(transactions: object[]): Promise<void> {
		throw new Exceptions.NotImplemented(this.constructor.name, "broadcast");
	}
}
