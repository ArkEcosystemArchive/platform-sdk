import { Coins, Collections, Contracts, Helpers, Networks, Services } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";
import Neon, { api } from "@cityofzion/neon-js";

import * as TransactionDTO from "../dto";
import { WalletData } from "../dto";

export class ClientService extends Services.AbstractClientService {
	readonly #http: HttpClient;
	readonly #peer: string;
	readonly #apiProvider;
	readonly #decimals: number;

	readonly #broadcastErrors: Record<string, string> = {
		"Block or transaction already exists and cannot be sent repeatedly.": "ERR_DUPLICATE",
		"The memory pool is full and no more transactions can be sent.": "ERR_EXCESS",
		"The block cannot be validated.": "ERR_VALIDATION_FAILED",
		"Block or transaction validation failed.": "ERR_VALIDATION_FAILED",
		"One of the Policy filters failed.": "ERR_POLICY_FILTER_FAILED",
		"Unknown error.": "ERR_UNKNOWN",
	};

	private constructor({ http, network, decimals }) {
		super();

		this.#http = http;

		this.#peer = {
			mainnet: "https://api.neoscan.io/api/main_net/v1",
			testnet: "https://neoscan-testnet.io/api/test_net/v1",
		}[network];

		this.#apiProvider = new api.neoscan.instance(network === "mainnet" ? "MainNet" : "TestNet");
		this.#decimals = decimals;
	}

	public static async __construct(config: Coins.ConfigRepository): Promise<ClientService> {
		return new ClientService({
			http: config.get<HttpClient>(Coins.ConfigKey.HttpClient),
			network: config.get<Networks.NetworkManifest>("network").id.split(".")[1],
			decimals: config.get(Coins.ConfigKey.CurrencyDecimals),
		});
	}

	public async transactions(query: Services.ClientTransactionsInput): Promise<Collections.TransactionDataCollection> {
		const basePath = `get_address_abstracts/${query.address}`;
		const basePage = (query.cursor as number) || 1;

		const response = await this.#get(`${basePath}/${basePage}`);

		const prevPage = response.page_number > 1 ? basePage - 1 : undefined;
		const nextPage = response.total_pages > 1 ? basePage + 1 : undefined;

		return this.dataTransferObjectService.transactions(
			response.entries,
			{
				prev: `${this.#peer}/${basePath}/${prevPage}`,
				self: undefined,
				next: `${this.#peer}/${basePath}/${nextPage}`,
				last: response.total_pages,
			},
			TransactionDTO,
			this.#decimals,
		);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const response = await this.#get(`get_balance/${id}`);

		return new WalletData({
			address: id,
			balance: response.balance.find((balance) => balance.asset === "NEO").amount,
		});
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const { response } = await Neon.sendAsset({
				api: this.#apiProvider,
				account: transaction.get("account"),
				intents: transaction.get("intents"),
			});

			if (response === undefined) {
				result.rejected.push(transaction.id());

				continue;
			}

			if (response.txid) {
				transaction.setAttributes({ identifier: response.txid });

				result.accepted.push(transaction.id());
			}

			// @ts-ignore
			if (response.error) {
				result.rejected.push(transaction.id());

				if (!Array.isArray(result.errors[transaction.id()])) {
					result.errors[transaction.id()] = [];
				}

				for (const [key, value] of Object.entries(this.#broadcastErrors)) {
					// @ts-ignore
					if (response.error.message.includes(key)) {
						result.errors[transaction.id()].push(value);
					}
				}
			}
		}

		return result;
	}

	async #get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.get(`${this.#peer}/${path}`, query);

		return response.json();
	}

	async #post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.post(`${this.#peer}/${path}`, body);

		return response.json();
	}
}
