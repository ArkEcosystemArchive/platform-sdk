import { Coins, Contracts, Exceptions, Helpers } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

import * as TransactionDTO from "../dto";
import { TransactionData, WalletData } from "../dto";
import { fetchTransaction, fetchTransactions, fetchUtxosAggregate, submitTransaction } from "./graphql-helpers";
import { usedAddressesForAccount } from "./helpers";

export class ClientService implements Contracts.ClientService {
	readonly #config: Coins.Config;

	private constructor({ config }) {
		this.#config = config;
	}

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService({
			config,
			http: config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient),
			peer: Arr.randomElement(config.get<string[]>("network.networking.hosts")),
		});
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transaction(
		id: string,
		input?: Contracts.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		return new TransactionData(await fetchTransaction(id, this.#config));
	}

	public async transactions(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		if (query.senderPublicKey === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, "transactions", "senderPublicKey");
		}

		const { usedSpendAddresses, usedChangeAddresses } = await usedAddressesForAccount(
			this.#config,
			query.senderPublicKey,
		);

		const transactions = (await fetchTransactions(
			this.#config,
			Array.from(usedSpendAddresses.values()).concat(Array.from(usedChangeAddresses.values())),
		)) as any;

		return Helpers.createTransactionDataCollectionWithType(
			transactions,
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
		const { usedSpendAddresses, usedChangeAddresses } = await usedAddressesForAccount(this.#config, id);

		const balance = await fetchUtxosAggregate(
			this.#config,
			Array.from(usedSpendAddresses.values()).concat(Array.from(usedChangeAddresses.values())),
		);

		return new WalletData({
			id,
			balance,
		});
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
				await submitTransaction(this.#config, transaction.toBroadcast());

				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());

				result.errors[transaction.id()] = error.message;
			}
		}

		return result;
	}
}
