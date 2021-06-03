import { Coins, Contracts, Helpers, Services } from "@arkecosystem/platform-sdk";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";

export class ClientService extends Services.AbstractClientService {
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
		super();

		this.#http = http;
		this.#peer = peer;
	}

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService({
			http: config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient),
			peer: `${Helpers.randomHostFromConfig(config)}/api`,
		});
	}

	public async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const result = await this.#get("transactions", { id });

		return Helpers.createTransactionDataWithType(result.data[0], TransactionDTO);
	}

	public async transactions(query: Services.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		// @ts-ignore
		const result = await this.#get("transactions", this.#createSearchParams({ sort: "timestamp:desc", ...query }));

		return Helpers.createTransactionDataCollectionWithType(
			result.data,
			this.#createPagination(result.data, result.meta),
			TransactionDTO,
		);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const result = await this.#get("accounts", { address: id });

		return new WalletData(result.data[0]);
	}

	public async wallets(query: Services.ClientWalletsInput): Promise<Coins.WalletDataCollection> {
		const result = await this.#get("accounts", query);

		return new Coins.WalletDataCollection(
			result.data.map((wallet) => new WalletData(wallet)),
			this.#createPagination(result.data, result.meta),
		);
	}

	public async delegate(id: string): Promise<Contracts.WalletData> {
		const result = await this.#get("delegates", { username: id });

		return new WalletData(result.data[0]);
	}

	public async delegates(query?: any): Promise<Coins.WalletDataCollection> {
		const result = await this.#get("delegates", this.#createSearchParams({ limit: 101, ...query }));

		return new Coins.WalletDataCollection(
			result.data.map((wallet) => new WalletData(wallet)),
			this.#createPagination(result.data, result.meta),
		);
	}

	public async votes(id: string): Promise<Services.VoteReport> {
		const { data } = await this.#get("votes", { address: id, limit: 101 });

		return {
			used: data.votesUsed,
			available: data.votesAvailable,
			publicKeys: data.votes.map((vote: { publicKey: string }) => vote.publicKey),
		};
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const { data, errors } = await this.#post("transactions", transaction.toBroadcast());

			if (data) {
				result.accepted.push(transaction.id());
			}

			if (errors) {
				result.rejected.push(transaction.id());

				if (!Array.isArray(result.errors[transaction.id()])) {
					result.errors[transaction.id()] = [];
				}

				for (const [key, value] of Object.entries(this.#broadcastErrors)) {
					if (errors[0].message.includes(key)) {
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

	#createSearchParams(searchParams: Services.ClientTransactionsInput): object {
		if (!searchParams) {
			searchParams = {};
		}

		if (searchParams.cursor) {
			// @ts-ignore
			searchParams.offset = searchParams.cursor - 1;
			delete searchParams.cursor;
		}

		// What is used as "address" with ARK is "senderIdOrRecipientId" with LSK.
		if (searchParams.address) {
			// @ts-ignore - This field doesn't exist on the interface but are needed.
			searchParams.senderIdOrRecipientId = searchParams.address;
			delete searchParams.address;
		}

		// LSK doesn't support bulk lookups so we will simply use the first address.
		if (searchParams.addresses) {
			// @ts-ignore - This field doesn't exist on the interface but are needed.
			searchParams.senderIdOrRecipientId = searchParams.addresses[0];
			delete searchParams.addresses;
		}

		return searchParams;
	}

	#createPagination(data, meta): Services.MetaPagination {
		const hasPreviousPage: boolean = data && data.length === meta.limit && meta.offset !== 0;
		const hasNextPage: boolean = data && data.length === meta.limit;

		return {
			prev: hasPreviousPage ? Number(meta.offset) - Number(meta.limit) : undefined,
			self: meta.offset,
			next: hasNextPage ? Number(meta.offset) + Number(meta.limit) : undefined,
			last: undefined,
		};
	}
}
