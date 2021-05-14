import { Coins, Contracts, Exceptions, Helpers } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #config: Coins.Config;
	readonly #client: Contracts.HttpClient;

	private constructor(config) {
		this.#config = config;
		this.#client = this.#config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);
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
		throw new Exceptions.NotImplemented(this.constructor.name, "transaction");
	}

	public async transactions(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		const account: string = query.address || query.addresses![0];
		const parameters: Record<string, string | number> = {
			action: "account_history",
			account,
			count: query.limit || 15,
		};

		if (query.cursor) {
			parameters.head = query.cursor;
		}

		const { history, previous } = (await this.#client.get(this.getHost(), parameters)).json();

		return Helpers.createTransactionDataCollectionWithType(
			Object.values(history).map((transaction: any) => {
				transaction._origin = account;

				return transaction;
			}),
			{
				prev: undefined,
				self: undefined,
				next: previous,
				last: undefined,
			},
			TransactionDTO,
		);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const { balance, pending } = (
			await this.#client.get(this.getHost(), {
				action: "account_info",
				account: id,
			})
		).json();

		return new WalletData({ id, balance, pending });
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
				//

				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());

				result.errors[transaction.id()] = error.message;
			}
		}

		return result;
	}

	private getHost(): string {
		return Arr.randomElement(this.#config.get<string[]>("network.networking.hosts"));
	}
}
