import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { ApiPromise } from "@polkadot/api";

import { createRpcClient } from "../helpers";

export class ClientService implements Contracts.ClientService {
	readonly #client: ApiPromise;

	private constructor(client: ApiPromise) {
		this.#client = client;
	}

	public static async construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService(await createRpcClient(config));
	}

	public async destruct(): Promise<void> {
		await this.#client.disconnect();
	}

	public async transaction(id: string): Promise<Contracts.TransactionDataType> {
		throw new Exceptions.NotImplemented(this.constructor.name, "transaction");
	}

	public async transactions(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, "transactions");
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wallet");
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
			throw new Exceptions.NotImplemented(this.constructor.name, "broadcast");
		}

		return result;
	}

	public async broadcastSpread(
		transactions: Contracts.SignedTransactionData[],
		hosts: string[],
	): Promise<Contracts.BroadcastResponse> {
		throw new Exceptions.NotImplemented(this.constructor.name, "broadcastSpread");
	}

	public async entityHistory(id: string, query?: Contracts.KeyValuePair): Promise<Coins.TransactionDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, "entityHistory");
	}
}
