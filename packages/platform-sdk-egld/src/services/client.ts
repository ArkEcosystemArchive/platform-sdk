import { Coins, Contracts, Exceptions, Helpers } from "@arkecosystem/platform-sdk";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #config: Coins.Config;
	readonly #http: Contracts.HttpClient;

	private constructor(config: Coins.Config) {
		this.#config = config;
		this.#http = config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);
	}

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService(config);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transaction(
		id: string,
		input?: Contracts.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const { data } = await this.get(`transaction/${id}`);

		return Helpers.createTransactionDataWithType({ hash: id, ...data.transaction }, TransactionDTO);
	}

	public async transactions(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
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

	public async wallets(query: Contracts.ClientWalletsInput): Promise<Coins.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wallets");
	}

	public async delegate(id: string): Promise<Contracts.WalletData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegate");
	}

	public async delegates(query?: Contracts.KeyValuePair): Promise<Coins.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegates");
	}

	public async votes(id: string): Promise<Contracts.VoteReport> {
		throw new Exceptions.NotImplemented(this.constructor.name, "votes");
	}

	public async voters(id: string, query?: Contracts.KeyValuePair): Promise<Coins.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, "voters");
	}

	public async syncing(): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, "syncing");
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Contracts.BroadcastResponse> {
		const result: Contracts.BroadcastResponse = {
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
		return Helpers.randomHostFromConfig(this.#config, "full").host;
	}
}
