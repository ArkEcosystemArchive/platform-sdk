import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import Neon from "@cityofzion/neon-js";
import { api } from "@cityofzion/neon-js";

import { TransactionData } from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #http: Contracts.HttpClient;
	readonly #peer: string;
	readonly #apiProvider;

	readonly #broadcastErrors: Record<string, string> = {
		"Block or transaction already exists and cannot be sent repeatedly.": "ERR_DUPLICATE",
		"The memory pool is full and no more transactions can be sent.": "ERR_EXCESS",
		"The block cannot be validated.": "ERR_VALIDATION_FAILED",
		"Block or transaction validation failed.": "ERR_VALIDATION_FAILED",
		"One of the Policy filters failed.": "ERR_POLICY_FILTER_FAILED",
		"Unknown error.": "ERR_UNKNOWN",
	};

	private constructor({ http, network }) {
		this.#http = http;

		this.#peer = {
			mainnet: "https://api.neoscan.io/api/main_net/v1/",
			testnet: "https://neoscan-testnet.io/api/test_net/v1/",
		}[network];

		this.#apiProvider = new api.neoscan.instance(network === "mainnet" ? "MainNet" : "TestNet");
	}

	public static async construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService({
			http: config.get<Contracts.HttpClient>("httpClient"),
			network: config.get<Coins.CoinNetwork>("network").id,
		});
	}

	public async destruct(): Promise<void> {
		//
	}

	// get_transaction/{txid}
	public async transaction(id: string): Promise<Contracts.TransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "transaction");
	}

	public async transactions(
		query: Contracts.ClientTransactionsInput,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		const response = await this.get(`get_address_abstracts/${query.address}/${query.page || 1}`);

		return {
			meta: {
				pageCount: response.total_pages,
				totalCount: response.total_entries,
				count: response.page_size,
				current: response.page_number,
			},
			data: new Coins.TransactionDataCollection(
				response.entries.map((transaction) => new TransactionData(transaction)),
			),
		};
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wallet");
	}

	public async wallets(
		query: Contracts.ClientWalletsInput,
	): Promise<Contracts.CollectionResponse<Coins.WalletDataCollection>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wallets");
	}

	public async delegate(id: string): Promise<Contracts.DelegateData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegate");
	}

	public async delegates(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Coins.DelegateDataCollection>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegates");
	}

	public async votes(id: string): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "votes");
	}

	public async voters(id: string): Promise<Contracts.CollectionResponse<Coins.WalletDataCollection>> {
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
			const { response } = await Neon.sendAsset({
				api: this.#apiProvider,
				account: transaction["account"],
				intents: transaction["intents"],
			});

			if (response.txid) {
				result.accepted.push(transaction.id);
			}

			if (response.error) {
				result.rejected.push(transaction.id);

				if (!Array.isArray(result.errors[transaction.id])) {
					result.errors[transaction.id] = [];
				}

				for (const [key, value] of Object.entries(this.#broadcastErrors)) {
					if (response.error.message.includes(key)) {
						result.errors[transaction.id].push(value);
					}
				}
			}
		}

		return result;
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return this.#http.get(`${this.#peer}/${path}`, query);
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return this.#http.post(`${this.#peer}/${path}`, body);
	}
}
