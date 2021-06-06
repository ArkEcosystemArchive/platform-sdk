import { Coins, Collections, Contracts, Helpers, Services } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";
import TronWeb from "tronweb";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";

export class ClientService extends Services.AbstractClientService {
	readonly #config: Coins.ConfigRepository;
	readonly #connection: TronWeb;
	readonly #peer: string;
	readonly #client: HttpClient;
	readonly #decimals: number;

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

	private constructor({ config }) {
		super();

		this.#config = config;
		this.#peer = Helpers.randomHostFromConfig(config);
		this.#connection = new TronWeb({ fullHost: this.#peer });
		this.#client = this.configRepository.get<HttpClient>(Coins.ConfigKey.HttpClient);
		this.#decimals = this.configRepository.get(Coins.ConfigKey.CurrencyDecimals);
	}

	public static async __construct(config: Coins.ConfigRepository): Promise<ClientService> {
		return new ClientService({ config });
	}

	public async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const result = await this.#connection.trx.getTransaction(id);

		return this.dataTransferObjectService.transaction(result, TransactionDTO).withDecimals(this.#decimals);
	}

	public async transactions(query: Services.ClientTransactionsInput): Promise<Collections.TransactionDataCollection> {
		const payload: Record<string, boolean | number> = {
			limit: query.limit || 15,
		};

		if (query.senderId) {
			payload.only_from = true;
		}

		if (query.recipientId) {
			payload.only_to = true;
		}

		const response = (
			await this.#client.get(`${this.#peer}/v1/accounts/${Helpers.pluckAddress(query)}/transactions`, payload)
		).json();

		return this.dataTransferObjectService.transactions(
			response.data.filter(({ raw_data }) => raw_data.contract[0].type === "TransferContract"),
			{
				prev: undefined,
				self: undefined,
				next: response.meta.fingerprint,
				last: undefined,
			},
			TransactionDTO,
			this.#decimals,
		);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const { data } = (await this.#client.get(`${this.#getHost()}/v1/accounts/${id}`)).json();

		return new WalletData(data[0]);
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const response = (
				await this.#client.post(`${this.#getHost()}/wallet/broadcasttransaction`, transaction.toBroadcast())
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

	#getHost(): string {
		return Helpers.randomHostFromConfig(this.#config);
	}
}
