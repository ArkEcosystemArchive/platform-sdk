import { Coins, Contracts, Exceptions, Helpers } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

import { WalletData } from "../dto";
import * as DTO from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #http: Contracts.HttpClient;
	readonly #peer: string;

	readonly #broadcastErrors: Record<string, string> = {
		"Invalid sender publicKey": "ERR_INVALID_SENDER_PUBLICKEY",
		"Account does not have enough LSK": "ERR_INSUFFICIENT_FUNDS",
		"Sender does not have a secondPublicKey": "ERR_MISSING_SECOND_PUBLICKEY",
		"Missing signSignature": "ERR_MISSING_SIGNATURE",
		"Sender is not a multisignature account": "ERR_MISSING_MULTISIGNATURE",
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
				peer: `${Arr.randomElement(config.get<Coins.CoinNetwork>("network").hosts)}/api`,
			});
		}
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transaction(id: string): Promise<Contracts.TransactionData> {
		const result = await this.get("transactions", { id });

		return Helpers.createTransactionDataWithType(result.data[0], DTO);
	}

	public async transactions(
		query: Contracts.ClientTransactionsInput,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		const result = await this.get("transactions", query);

		return {
			meta: result.meta,
			data: Helpers.createTransactionDataCollectionWithType(result.data, DTO),
		};
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const result = await this.get("accounts", { address: id });

		return new WalletData(result.data[0]);
	}

	public async wallets(
		query: Contracts.ClientWalletsInput,
	): Promise<Contracts.CollectionResponse<Coins.WalletDataCollection>> {
		const result = await this.get("accounts", query);

		return {
			meta: result.meta,
			data: new Coins.WalletDataCollection(result.data.map((wallet) => new WalletData(wallet))),
		};
	}

	public async delegate(id: string): Promise<Contracts.WalletData> {
		const result = await this.get("delegates", { username: id });

		return new WalletData(result.data[0]);
	}

	public async delegates(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Coins.WalletDataCollection>> {
		const result = await this.get("delegates");

		return {
			meta: result.meta,
			data: new Coins.WalletDataCollection(result.data.map((wallet) => new WalletData(wallet))),
		};
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
			const { data, errors } = await this.post("transactions", transaction);

			if (data) {
				result.accepted.push(transaction.id);
			}

			if (errors) {
				result.rejected.push(transaction.id);

				if (!Array.isArray(result.errors[transaction.id])) {
					result.errors[transaction.id] = [];
				}

				for (const [key, value] of Object.entries(this.#broadcastErrors)) {
					if (errors[0].message.includes(key)) {
						result.errors[transaction.id].push(value);
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
