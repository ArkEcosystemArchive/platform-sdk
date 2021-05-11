import { Coins, Contracts, Exceptions, Helpers } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";

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

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		try {
			return new ClientService({
				http: config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient),
				peer: config.get<string>("peer"),
			});
		} catch {
			return new ClientService({
				http: config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient),
				peer: Arr.randomElement(config.get<string[]>("network.networking.hosts")),
			});
		}
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transaction(
		id: string,
		input?: Contracts.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const response = await this.get(`txs/${id}`);

		return Helpers.createTransactionDataWithType(response, TransactionDTO);
	}

	public async transactions(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		const page = Number(query.cursor || 1);

		const response = await this.get("txs", {
			"message.action": "send",
			"message.sender": query.address,
			page,
			limit: query.limit || 100,
		});

		return Helpers.createTransactionDataCollectionWithType(
			response.txs,
			{
				prev: page <= 1 ? undefined : page - 1,
				self: Number(response.page_number),
				next: page >= Number(response.page_total) ? undefined : page,
				last: response.page_total,
			},
			TransactionDTO,
		);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const { result } = await this.get(`auth/accounts/${id}`);

		return new WalletData(result.value);
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
		const { syncing } = await this.get("syncing");

		return syncing;
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Contracts.BroadcastResponse> {
		const result: Contracts.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const { logs, txhash } = await this.post("txs", { mode: "block", tx: transaction });

			transaction.setAttributes({ identifier: txhash });

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

	public async broadcastSpread(
		transactions: Contracts.SignedTransactionData[],
		hosts: string[],
	): Promise<Contracts.BroadcastResponse> {
		throw new Exceptions.NotImplemented(this.constructor.name, "broadcastSpread");
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.get(`${this.#peer}/${path}`, query);

		return response.json();
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.post(`${this.#peer}/${path}`, body);

		return response.json();
	}
}
