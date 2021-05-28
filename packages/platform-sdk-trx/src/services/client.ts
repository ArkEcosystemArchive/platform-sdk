import { Coins, Contracts, Exceptions, Helpers } from "@arkecosystem/platform-sdk";
import TronWeb from "tronweb";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #config: Coins.Config;
	readonly #connection: TronWeb;
	readonly #peer: string;
	readonly #client: Contracts.HttpClient;

	readonly #broadcastErrors: Record<string, string> = {
		SIGERROR: "ERR_INVALID_SIGNATURE",
		CONTRACT_VALIDATE_ERROR: "ERR_CONTRACT_VALIDATE_ERROR",
		CONTRACT_EXE_ERROR: "ERR_CONTRACT_EXE_ERROR",
		BANDWITH_ERROR: "ERR_BANDWITH_ERROR",
		DUP_TRANSACTION_ERROR: "ERR_DUP_TRANSACTION_ERROR",
		TAPOS_ERROR: "ERR_TAPOS_ERROR",
		TOO_BIG_TRANSACTION_ERROR: "ERR_TOO_BIG_TRANSACTION_ERROR",
		TRANSACTION_EXPIRATION_ERROR: "ERR_TRANSACTION_EXPIRATION_ERROR",
		SERVER_BUSY: "ERR_SERVER_BUSY",
		NO_CONNECTION: "ERR_NO_CONNECTION",
		NOT_ENOUGH_EFFECTIVE_CONNECTION: "ERR_NOT_ENOUGH_EFFECTIVE_CONNECTION",
		OTHER_ERROR: "ERR_OTHER_ERROR",
	};

	private constructor({ config, peer }) {
		this.#config = config;
		this.#peer = peer;
		this.#connection = new TronWeb({
			fullHost: peer,
		});
		this.#client = this.#config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);
	}

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService({
			config,
			peer: Helpers.randomHostFromConfig(config),
		});
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transaction(
		id: string,
		input?: Contracts.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const result = await this.#connection.trx.getTransaction(id);

		return Helpers.createTransactionDataWithType(result, TransactionDTO);
	}

	public async transactions(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		const payload: Record<string, boolean | number> = {
			limit: query.limit || 15,
		};

		if (query.senderId) {
			payload.only_from = true;
		}

		if (query.recipientId) {
			payload.only_to = true;
		}

		const response: any = (
			await this.#client.get(`${this.#peer}/v1/accounts/${Helpers.pluckAddress(query)}/transactions`, payload)
		).json();

		return Helpers.createTransactionDataCollectionWithType(
			response.data.filter(({ raw_data }) => raw_data.contract[0].type === "TransferContract"),
			{
				prev: undefined,
				self: undefined,
				next: response.meta.fingerprint,
				last: undefined,
			},
			TransactionDTO,
		);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const { data } = (await this.#client.get(`${this.getHost()}/v1/accounts/${id}`)).json();

		return new WalletData(data[0]);
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

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Contracts.BroadcastResponse> {
		const result: Contracts.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const response = (
				await this.#client.post(`${this.getHost()}/wallet/broadcasttransaction`, transaction.toBroadcast())
			).json();

			if (response.result) {
				result.accepted.push(transaction.id());
			}

			if (response.code) {
				result.rejected.push(transaction.id());

				if (!Array.isArray(result.errors[transaction.id()])) {
					result.errors[transaction.id()] = [];
				}

				for (const [key, value] of Object.entries(this.#broadcastErrors)) {
					if (response.code.includes(key)) {
						result.errors[transaction.id()].push(value);
					}
				}
			}
		}

		return result;
	}

	private getHost(): string {
		return Helpers.randomHostFromConfig(this.#config);
	}
}
