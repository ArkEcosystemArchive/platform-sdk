import { Coins, Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";

import { DelegateData, TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #baseUrl: string;

	readonly #broadcastErrors: Record<string, string> = {
		"Invalid sender publicKey": "ERR_INVALID_SENDER_PUBLICKEY",
		"Account does not have enough LSK": "ERR_INSUFFICIENT_FUNDS",
		"Sender does not have a secondPublicKey": "ERR_MISSING_SECOND_PUBLICKEY",
		"Missing signSignature": "ERR_MISSING_SIGNATURE",
		"Sender is not a multisignature account": "ERR_MISSING_MULTISIGNATURE",
	};

	private constructor(peer: string) {
		this.#baseUrl = `${peer}/api`;
	}

	public static async construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService(config.get("peer"));
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transaction(id: string): Promise<Contracts.TransactionData> {
		const result = await this.get("transactions", { id });

		return new TransactionData(result.data[0]);
	}

	public async transactions(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		const result = await this.get("transactions", query);

		return { meta: result.meta, data: result.data.map((transaction) => new TransactionData(transaction)) };
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const result = await this.get("accounts", { address: id });

		return new WalletData(result.data[0]);
	}

	public async wallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		const result = await this.get("accounts", query);

		return { meta: result.meta, data: result.data.map((wallet) => new WalletData(wallet)) };
	}

	public async delegate(id: string): Promise<Contracts.DelegateData> {
		const result = await this.get("delegates", { username: id });

		return new DelegateData(result.data[0]);
	}

	public async delegates(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.DelegateData>> {
		const result = await this.get("delegates");

		return { meta: result.meta, data: result.data.map((wallet) => new DelegateData(wallet)) };
	}

	public async votes(id: string): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "votes");
	}

	public async voters(id: string): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
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
		return Utils.Http.new(this.#baseUrl).get(path, query);
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.Http.new(this.#baseUrl).post(path, body);
	}
}
