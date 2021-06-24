import { Collections, Contracts, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import TronWeb from "tronweb";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	#connection!: TronWeb;
	#peer!: string;

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

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#peer = Helpers.randomHostFromConfig(this.configRepository);
		this.#connection = new TronWeb({ fullHost: this.#peer });
	}

	public override async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const result = await this.#connection.trx.getTransaction(id);

		return this.dataTransferObjectService.transaction(result);
	}

	public override async transactions(
		query: Services.ClientTransactionsInput,
	): Promise<Collections.TransactionDataCollection> {
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
			await this.httpClient.get(`${this.#peer}/v1/accounts/${Helpers.pluckAddress(query)}/transactions`, payload)
		).json();

		return this.dataTransferObjectService.transactions(
			response.data.filter(({ raw_data }) => raw_data.contract[0].type === "TransferContract"),
			{
				prev: undefined,
				self: undefined,
				next: response.meta.fingerprint,
				last: undefined,
			},
		);
	}

	public override async wallet(id: string): Promise<Contracts.WalletData> {
		const { data } = (await this.httpClient.get(`${this.#getHost()}/v1/accounts/${id}`)).json();

		return this.dataTransferObjectService.wallet(data[0]);
	}

	public override async broadcast(
		transactions: Contracts.SignedTransactionData[],
	): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const response = (
				await this.httpClient.post(`${this.#getHost()}/wallet/broadcasttransaction`, transaction.toBroadcast())
			).json();

			if (response.result) {
				result.accepted.push(transaction.id());
			}

			if (response.code) {
				result.rejected.push(transaction.id());

				for (const key of Object.keys(this.#broadcastErrors)) {
					if (response.code.includes(key)) {
						result.errors[transaction.id()] = key;

						break;
					}
				}
			}
		}

		return result;
	}

	#getHost(): string {
		return Helpers.randomHostFromConfig(this.configRepository);
	}
}
