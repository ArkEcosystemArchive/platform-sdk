import { Coins, Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import Web3 from "web3";

import { TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	static readonly MONTH_IN_SECONDS = 8640 * 30;

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

	private constructor(peer: string) {
		this.#peer = peer;
	}

	public static async construct(config: Coins.Config): Promise<ClientService> {
		try {
			return new ClientService(config.get<string>("peer"));
		} catch {
			return new ClientService(Utils.randomArrayElement(config.get<Coins.CoinNetwork>("network").hosts));
		}
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transaction(id: string): Promise<Contracts.TransactionData> {
		return new TransactionData(await this.get(`transactions/${id}`));
	}

	public async transactions(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		const endBlock: number = (await this.get("status")).height;
		const startBlock: number = endBlock - (query?.count ?? ClientService.MONTH_IN_SECONDS);

		const transactions: TransactionData[] = [];
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

		return { meta: {}, data: transactions };
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		return new WalletData(await this.get(`wallets/${id}`));
	}

	public async wallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wallets");
	}

	public async delegate(id: string): Promise<Contracts.DelegateData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegate");
	}

	public async delegates(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.DelegateData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegates");
	}

	public async votes(id: string): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "votes");
	}

	public async voters(id: string): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
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
		return Utils.Http.new(this.#peer).get(path, query);
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.Http.new(this.#peer).post(path, body);
	}
}
