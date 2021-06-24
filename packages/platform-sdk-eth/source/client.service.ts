import { Collections, Contracts, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import Web3 from "web3";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	static readonly MONTH_IN_SECONDS = 8640 * 30;

	#peer!: string;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#peer = Helpers.randomHostFromConfig(this.configRepository);
	}

	public override async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		return this.dataTransferObjectService.transaction(await this.#get(`transactions/${id}`));
	}

	public override async transactions(
		query: Services.ClientTransactionsInput,
	): Promise<Collections.TransactionDataCollection> {
		const transactions: unknown[] = (await this.#get(`wallets/${query.address}/transactions`)) as any;

		return this.dataTransferObjectService.transactions(
			transactions,
			// TODO: implement pagination on server
			{
				prev: undefined,
				self: undefined,
				next: undefined,
				last: undefined,
			},
		);
	}

	public override async wallet(id: string): Promise<Contracts.WalletData> {
		return this.dataTransferObjectService.wallet(await this.#get(`wallets/${id}`));
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
			const transactionId: string | null = Web3.utils.sha3(transaction.toBroadcast());

			if (!transactionId) {
				throw new Error("Failed to compute the transaction ID.");
			}

			transaction.setAttributes({ identifier: transactionId });

			const response = await this.#post("transactions", { transactions: [transaction] });

			if (response.result) {
				result.accepted.push(transactionId);
			}

			if (response.error) {
				result.rejected.push(transactionId);

				result.errors[transactionId] = response.error.message;
			}
		}

		return result;
	}

	async #get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return (await this.httpClient.get(`${this.#peer}/${path}`, query)).json();
	}

	async #post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return (await this.httpClient.post(`${this.#peer}/${path}`, body)).json();
	}
}
