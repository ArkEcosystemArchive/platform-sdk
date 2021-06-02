import { Coins, Contracts, Helpers, Services } from "@arkecosystem/platform-sdk";
import Web3 from "web3";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";

export class ClientService extends Services.AbstractClientService {
	static readonly MONTH_IN_SECONDS = 8640 * 30;

	readonly #http: Contracts.HttpClient;
	readonly #peer: string;

	readonly #broadcastErrors: Record<string, string> = {
		"nonce too low": "ERR_NONCE_TOO_LOW",
		"nonce too high": "ERR_NONCE_TOO_HIGH",
		"gas limit reached": "ERR_GAS_LIMIT_REACHED",
		"insufficient funds for transfer": "ERR_INSUFFICIENT_FUNDS_FOR_TRANSFER",
		"insufficient funds for gas * price + value": "ERR_INSUFFICIENT_FUNDS",
		"gas uint64 overflow": "ERR_GAS_UINT_OVERFLOW",
		"intrinsic gas too low": "ERR_INTRINSIC_GAS",
	};

	private constructor({ http, peer }) {
		super();

		this.#http = http;
		this.#peer = peer;
	}

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService({
			http: config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient),
			peer: Helpers.randomHostFromConfig(config),
		});
	}

	public async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		return Helpers.createTransactionDataWithType(await this.get(`transactions/${id}`), TransactionDTO);
	}

	public async transactions(query: Services.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		const transactions: unknown[] = (await this.get(`wallets/${query.address}/transactions`)) as any;

		return Helpers.createTransactionDataCollectionWithType(
			transactions,
			// TODO: implement pagination on server
			{
				prev: undefined,
				self: undefined,
				next: undefined,
				last: undefined,
			},
			TransactionDTO,
		);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		return new WalletData(await this.get(`wallets/${id}`));
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const transactionId: string | null = Web3.utils.sha3(transaction.toBroadcast());

			if (!transactionId) {
				throw new Error("Failed to compute the transaction ID.");
			}

			transaction.setAttributes({ identifier: transactionId });

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
		return (await this.#http.get(`${this.#peer}/${path}`, query)).json();
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return (await this.#http.post(`${this.#peer}/${path}`, body)).json();
	}
}
