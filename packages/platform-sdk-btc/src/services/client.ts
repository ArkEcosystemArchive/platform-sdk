import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

import { TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #http: Contracts.HttpClient;
	readonly #peer: string;

	readonly #broadcastErrors: Record<string, string> = {
		"bad-txns-inputs-duplicate": "ERR_INPUTS_DUPLICATE",
		"bad-txns-in-belowout": "ERR_IN_BELOWOUT",
		"bad-txns-vout-negative": "ERR_VOUT_NEGATIVE",
		"bad-txns-vout-toolarge": "ERR_VOUT_TOOLARGE",
		"bad-txns-txouttotal-toolarge": "ERR_TXOUTTOTAL_TOOLARGE",
	};

	private constructor({ http, peer }) {
		this.#http = http;
		this.#peer = peer;
	}

	public static async construct(config: Coins.Config): Promise<ClientService> {
		try {
			return new ClientService({
				http: config.get<Contracts.HttpClient>("httpClient"),
				peer: config.get<string>("peer"),
			});
		} catch {
			return new ClientService({
				http: config.get<Contracts.HttpClient>("httpClient"),
				peer: Arr.randomElement(config.get<Coins.CoinNetwork>("network").hosts),
			});
		}
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transaction(id: string): Promise<Contracts.TransactionData> {
		return new TransactionData(await this.get(`transactions/${id}`));
	}

	public async transactions(
		query: Contracts.ClientTransactionsInput,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "transactions");
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		return new WalletData(await this.get(`wallets/${id}`));
	}

	public async wallets(
		query: Contracts.ClientWalletsInput,
	): Promise<Contracts.CollectionResponse<Coins.WalletDataCollection>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wallets");
	}

	public async delegate(id: string): Promise<Contracts.WalletData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegate");
	}

	public async delegates(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Coins.WalletDataCollection>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegates");
	}

	public async votes(
		id: string,
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "votes");
	}

	public async voters(
		id: string,
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Coins.WalletDataCollection>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "voters");
	}

	public async syncing(): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, "syncing");
	}

	public async broadcast(transactions: Contracts.SignedTransaction[]): Promise<Contracts.BroadcastResponse> {
		const result: Contracts.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const transactionId: string = transaction; // todo: get the transaction ID

			if (!transactionId) {
				throw new Error("Failed to compute the transaction ID.");
			}

			const response = await this.post("transactions", { transactions: [transaction] });

			if (response.result) {
				result.accepted.push(transactionId);
			}

			if (response.error) {
				result.rejected.push(transactionId);

				if (!Array.isArray(result.errors[transactionId])) {
					result.errors[transactionId] = [];
				}

				for (const [key, value] of Object.entries(this.#broadcastErrors)) {
					if (response.error.message.includes(key)) {
						result.errors[transactionId].push(value);
					}
				}
			}
		}

		return result;
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.get(`${this.#peer}/${path}`, query);

		return response.json();
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.post(`${this.#peer}/${path}`, body);

		return response.json();
	}
}
