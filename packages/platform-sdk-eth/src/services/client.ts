import { Coins, Contracts, Exceptions, Helpers } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import Web3 from "web3";

import { TransactionData, WalletData } from "../dto";
import * as DTO from "../dto";

export class ClientService implements Contracts.ClientService {
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
		return Helpers.createTransactionDataWithType(await this.get(`transactions/${id}`), DTO);
	}

	public async transactions(
		query: Contracts.ClientTransactionsInput,
	): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		const endBlock: number = (await this.get("status")).height;
		const startBlock: number = endBlock - (query?.limit ?? ClientService.MONTH_IN_SECONDS);

		const transactions: Contracts.TransactionDataType[] = [];
		for (let i = startBlock; i < endBlock; i++) {
			const block = await this.get(`blocks/${i}`);

			if (block && block.transactions) {
				for (const transaction of block.transactions) {
					if (
						query?.address === "*" ||
						query?.address === transaction.from ||
						query?.address === transaction.to
					) {
						transactions.push(new TransactionData(transaction));
					}
				}
			}
		}

		return {
			meta: { prev: undefined, next: undefined },
			data: Helpers.createTransactionDataCollectionWithType(transactions, DTO),
		};
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		return new WalletData(await this.get(`wallets/${id}`));
	}

	public async wallets(
		query: Contracts.ClientWalletsInput,
	): Promise<Contracts.CollectionResponse<Coins.WalletDataCollection>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wallets");
	}

	public async delegate(id: string): Promise<Contracts.WalletData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegate");
	}

	public async delegates(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Coins.WalletDataCollection>> {
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
		return (await this.get("status")).syncing === false;
	}

	public async broadcast(transactions: Contracts.SignedTransaction[]): Promise<Contracts.BroadcastResponse> {
		const result: Contracts.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const transactionId: string | null = Web3.utils.sha3(transaction);

			if (!transactionId) {
				throw new Error("Failed to compute the transaction ID.");
			}

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
		const response = await this.#http.get(`${this.#peer}/${path}`, query);

		return response.json();
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.post(`${this.#peer}/${path}`, body);

		return response.json();
	}
}
