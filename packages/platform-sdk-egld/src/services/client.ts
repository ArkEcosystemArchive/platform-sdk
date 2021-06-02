import { Coins, Contracts, Helpers, Services } from "@arkecosystem/platform-sdk";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";

export class ClientService extends Services.AbstractClientService {
	readonly #config: Coins.Config;
	readonly #http: Contracts.HttpClient;

	private constructor(config: Coins.Config) {
		super();

		this.#config = config;
		this.#http = config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);
	}

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService(config);
	}

	public async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const { data } = await this.get(`transaction/${id}`);

		return Helpers.createTransactionDataWithType({ hash: id, ...data.transaction }, TransactionDTO);
	}

	public async transactions(query: Services.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		const { data } = await this.get(`address/${Helpers.pluckAddress(query)}/transactions`);

		return Helpers.createTransactionDataCollectionWithType(
			data.transactions,
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
		const { data } = await this.get(`address/${id}`);

		return new WalletData(data.account);
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			try {
				const { txHash } = await this.post("transaction/send", transaction.toBroadcast());

				transaction.setAttributes({ identifier: txHash });

				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());

				result.errors[transaction.id()] = error.message;
			}
		}

		return result;
	}

	private async get(path: string): Promise<Contracts.KeyValuePair> {
		return (await this.#http.get(`${this.host()}/v1.0/${path}`)).json();
	}

	private async post(path: string, data: object): Promise<Contracts.KeyValuePair> {
		return (await this.#http.post(`${this.host()}/v1.0/${path}`, data)).json();
	}

	private host(): string {
		return Helpers.randomHostFromConfig(this.#config);
	}
}
