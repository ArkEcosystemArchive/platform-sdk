import { Collections, Contracts, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import TronWeb from "tronweb";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	#connection!: TronWeb;
	#peer!: string;

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

				result.errors[transaction.id()] = response.code;
			}
		}

		return result;
	}

	#getHost(): string {
		return Helpers.randomHostFromConfig(this.configRepository);
	}
}
