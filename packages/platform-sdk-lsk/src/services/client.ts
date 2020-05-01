import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";

import { DelegateData, TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #baseUrl: string;

	private constructor(peer: string) {
		this.#baseUrl = peer;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<ClientService> {
		return new ClientService(opts.peer);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transaction(id: string): Promise<Contracts.TransactionData> {
		const result = await this.get("transactions", { id });

		return new TransactionData(result.data[0]);
	}

	public async transactions(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		const result = await this.get("transactions", query);

		return { meta: result.meta, data: result.data.map((transaction) => new TransactionData(transaction)) };
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const result = await this.get("accounts", { address: id });

		return new WalletData(result.data[0]);
	}

	public async wallets(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		const result = await this.get("accounts", query);

		return { meta: result.meta, data: result.data.map((wallet) => new WalletData(wallet)) };
	}

	public async delegate(id: string): Promise<Contracts.DelegateData> {
		const result = await this.get("delegates", { username: id });

		return new DelegateData(result.data[0]);
	}

	public async delegates(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.DelegateData>> {
		const result = await this.get("delegates");

		return { meta: result.meta, data: result.data.map((wallet) => new DelegateData(wallet)) };
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

	public async fees(days: number): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "fees");
	}

	public async syncing(): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, "syncing");
	}

	public async broadcast(transactions: object[]): Promise<void> {
		for (const transaction of transactions) {
			try {
				await this.post("transactions", transaction);
			} catch (e) {
				throw new Error((await e.responseBody).toString());
			}
		}
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.getJSON(`${this.#baseUrl}/api/${path}`, query);
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.postJSON(`${this.#baseUrl}/api/`, path, body);
	}
}
