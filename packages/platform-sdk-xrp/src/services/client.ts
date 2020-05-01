import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import { RippleAPI } from "ripple-lib";

import { TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #connection: RippleAPI;
	readonly #dataUrl: string = "https://data.ripple.com/v2";

	private constructor (connection: RippleAPI) {
		this.#connection = connection;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<ClientService> {
		const connection = new RippleAPI({ server: opts.peer });

		await connection.connect();

		return new ClientService(connection);
	}

	public async destruct() {
		await this.#connection.disconnect();
	}

	public async transaction(id: string): Promise<Contracts.TransactionData> {
		const transaction = await this.#connection.getTransaction(id);

		return new TransactionData(transaction);
	}

	public async transactions(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		const transactions = await this.#connection.getTransactions(query.address, { types: ["payment"] });

		return { meta: {}, data: transactions.map((transaction) => new TransactionData(transaction)) };
	}

	public async searchTransactions(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const wallet = await this.#connection.getAccountInfo(id);

		return new WalletData({ account: id, balance: wallet.xrpBalance });
	}

	public async wallets(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wallets");
	}

	public async searchWallets(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchWallets");
	}

	public async delegate(id: string): Promise<Contracts.DelegateData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegate");
	}

	public async delegates(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.DelegateData>> {
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
		throw new Exceptions.NotImplemented(this.constructor.name, "feesByType");
	}

	public async syncing(): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, "syncing");
	}

	public async broadcast(transactions: any[]): Promise<void> {
		for (const transaction of transactions) {
			await this.#connection.submit(transaction);
		}
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.getJSON(`${this.#dataUrl}/${path}`, query);
	}
}
