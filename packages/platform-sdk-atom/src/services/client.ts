import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

import { TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #http: Contracts.HttpClient;
	readonly #peer: string;

	readonly #broadcastErrors: Record<string, string> = {
		"failed to marshal JSON bytes": "ERR_JSON_MARSHAL",
		"failed to unmarshal JSON bytes": "ERR_JSON_UNMARSHAL",
		"insufficient account funds": "ERR_INSUFFICIENT_FUNDS",
		"insufficient fee": "ERR_INSUFFICIENT_FEE",
		"insufficient funds": "ERR_INSUFFICIENT_FUNDS",
		"invalid account password": "ERR_WRONG_PASSWORD",
		"invalid address": "ERR_INVALID_ADDRESS",
		"invalid coins": "ERR_INVALID_COINS",
		"invalid gas adjustment": "ERROR_INVALID_GAS_ADJUSTMENT",
		"invalid pubkey": "ERR_INVALID_PUB_KEY",
		"invalid request": "ERR_INVALID_REQUEST",
		"invalid sequence": "ERR_INVALID_SEQUENCE",
		"key not found": "ERR_KEY_NOT_FOUND",
		"maximum number of signatures exceeded": "ERR_TOO_MANY_SIGNATURES",
		"memo too large": "ERR_MEMO_TOO_LARGE",
		"mempool is full": "ERR_MEMPOOL_IS_FULL",
		"no signatures supplied": "ERR_NO_SIGNATURES",
		"out of gas": "ERR_OUT_OF_GAS",
		"tx already in mempool": "ERR_TX_IN_MEMPOOL_CACHE",
		"tx intended signer does not match the given signer": "ERROR_INVALID_SIGNER",
		"tx parse error": "ERR_TX_DECODE",
		"tx too large": "ERR_TX_TOO_LARGE",
		"unknown address": "ERR_UNKNOWN_ADDRESS",
		"unknown request": "ERR_UNKNOWN_REQUEST",
		internal: "ERR_INTERNAL",
		panic: "ERR_PANIC",
		unauthorized: "ERR_UNAUTHORIZED",
	};

	private constructor({ http, peer }) {
		this.#http = http;
		this.#peer = peer;
	}

	public static async construct(config: Coins.Config): Promise<ClientService> {
		try {
			return new ClientService({
				http: config.get<Contracts.HttpClient>("httpClient"),
				peer: config.get<string>("peer"),
			});
		} catch {
			return new ClientService({
				http: config.get<Contracts.HttpClient>("httpClient"),
				peer: Arr.randomElement(config.get<Coins.CoinNetwork>("network").hosts),
			});
		}
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transaction(id: string): Promise<Contracts.TransactionData> {
		const response = await this.get(`txs/${id}`);

		return new TransactionData(response);
	}

	public async transactions(
		query: Contracts.ClientTransactionsInput,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		const response = await this.get("txs", {
			"message.action": "send",
			"message.sender": query.address,
			page: query.page || 1,
			limit: query.limit || 100,
		});

		return {
			meta: {
				prev: response._links.prev.href,
				next: response._links.next.href,
			},
			data: new Coins.TransactionDataCollection(
				response.txs.map((transaction) => new TransactionData(transaction)),
			),
		};
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const { result } = await this.get(`auth/accounts/${id}`);

		return new WalletData(result.value);
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

	public async votes(
		id: string,
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "votes");
	}

	public async voters(
		id: string,
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Coins.WalletDataCollection>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "voters");
	}

	public async syncing(): Promise<boolean> {
		const { syncing } = await this.get("syncing");

		return syncing;
	}

	public async broadcast(transactions: Contracts.SignedTransaction[]): Promise<Contracts.BroadcastResponse> {
		const result: Contracts.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const { logs, txhash } = await this.post("txs", { mode: "block", tx: transaction });

			if (logs[0].success === true) {
				result.accepted.push(txhash);
			} else {
				const { message } = JSON.parse(logs[0].log);

				if (message) {
					result.rejected.push(txhash);

					if (!Array.isArray(result.errors[txhash])) {
						result.errors[txhash] = [];
					}

					for (const [key, value] of Object.entries(this.#broadcastErrors)) {
						if (message.includes(key)) {
							result.errors[txhash].push(value);
						}
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
