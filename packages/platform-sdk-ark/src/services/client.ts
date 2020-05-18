import { Connection } from "@arkecosystem/client";
import { Coins, Contracts, Utils } from "@arkecosystem/platform-sdk";

import { DelegateData, TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #baseUrl: string;
	readonly #connection: Connection;

	private constructor(peer: string) {
		this.#baseUrl = peer;
		this.#connection = new Connection(peer);
	}

	public static async construct(config: Coins.Config): Promise<ClientService> {
		try {
			return new ClientService(config.get<string>("peer"));
		} catch {
			return new ClientService(Utils.randomArrayElement(config.get<Coins.CoinNetwork>("network").hosts));
		}
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transaction(id: string): Promise<Contracts.TransactionData> {
		const { body } = await this.#connection.api("transactions").get(id);

		return new TransactionData(body.data);
	}

	public async transactions(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		const { body } = await this.#connection.api("transactions").search(query);

		return { meta: body.meta, data: body.data.map((transaction) => new TransactionData(transaction)) };
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const { body } = await this.#connection.api("wallets").get(id);

		return new WalletData(body.data);
	}

	public async wallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		const { body } = await this.#connection.api("wallets").search(query);

		return { meta: body.meta, data: body.data.map((wallet) => new WalletData(wallet)) };
	}

	public async delegate(id: string): Promise<Contracts.DelegateData> {
		const { body } = await this.#connection.api("delegates").get(id);

		return new DelegateData(body.data);
	}

	public async delegates(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.DelegateData>> {
		const { body } = await this.#connection.api("delegates").all(query);

		return { meta: body.meta, data: body.data.map((wallet) => new DelegateData(wallet)) };
	}

	public async votes(id: string): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		const { body } = await this.#connection.api("wallets").votes(id);

		return { meta: body.meta, data: body.data.map((transaction) => new TransactionData(transaction)) };
	}

	public async voters(id: string): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		const { body } = await this.#connection.api("delegates").voters(id);

		return { meta: body.meta, data: body.data.map((wallet) => new WalletData(wallet)) };
	}

	public async syncing(): Promise<boolean> {
		const { body } = await this.#connection.api("node").syncing();

		return body.data.syncing;
	}

	public async broadcast(transactions: Contracts.SignedTransaction[]): Promise<Contracts.BroadcastResponse> {
		const { data, errors } = await this.post("transactions", { transactions });

		const result: Contracts.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		if (Array.isArray(data.accept)) {
			result.accepted = data.accept;
		}

		if (Array.isArray(data.invalid)) {
			result.rejected = data.invalid;
		}

		if (errors) {
			for (const [key, value] of Object.entries(errors)) {
				if (!Array.isArray(result.errors[key])) {
					result.errors[key] = [];
				}

				// @ts-ignore
				for (const error of value) {
					// @ts-ignore
					result.errors[key].push(error.type);
				}
			}
		}

		return result;
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.Http.new(this.#baseUrl).get(path, query);
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.Http.new(this.#baseUrl).post(path, body);
	}
}
