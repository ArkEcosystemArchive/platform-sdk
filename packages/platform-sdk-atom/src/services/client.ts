import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";

import { TransactionData, WalletData } from "../dto";

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
		const response = await this.get(`txs/${id}`);

		return new TransactionData(response);
	}

	public async transactions(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		const response = await this.get("txs", {
			"message.action": "send",
			"message.sender": query.address,
			page: query.page || 1,
			limit: query.limit || 100,
		});

		return { meta: {}, data: response.txs.map((transaction) => new TransactionData(transaction)) };
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const { result } = await this.get(`auth/accounts/${id}`);

		return new WalletData(result.value);
	}

	public async wallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
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

	public async syncing(): Promise<boolean> {
		const { syncing } = await this.get("syncing");

		return syncing;
	}

	public async broadcast(transactions: object[]): Promise<Contracts.BroadcastResponse> {
		for (const transaction of transactions) {
			await this.post("txs", { mode: "sync", tx: transaction });
		}
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.getJSON(`${this.#baseUrl}/${path}`, query);
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.postJSON(`${this.#baseUrl}/`, path, body);
	}
}
