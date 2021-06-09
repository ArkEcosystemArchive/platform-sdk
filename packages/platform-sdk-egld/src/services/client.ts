import { Collections, Contracts, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";

import { WalletData } from "../dto";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	public async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const { data } = await this.#get(`transaction/${id}`);

		return this.dataTransferObjectService.transaction({ hash: id, ...data.transaction });
	}

	public async transactions(query: Services.ClientTransactionsInput): Promise<Collections.TransactionDataCollection> {
		const { data } = await this.#get(`address/${Helpers.pluckAddress(query)}/transactions`);

		return this.dataTransferObjectService.transactions(data.transactions, {
			prev: undefined,
			self: undefined,
			next: undefined,
			last: undefined,
		});
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const { data } = await this.#get(`address/${id}`);

		return new WalletData(data.account);
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			try {
				const { txHash } = await this.#post("transaction/send", transaction.toBroadcast());

				transaction.setAttributes({ identifier: txHash });

				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());

				result.errors[transaction.id()] = error.message;
			}
		}

		return result;
	}

	async #get(path: string): Promise<Contracts.KeyValuePair> {
		return (await this.httpClient.get(`${this.#host()}/v1.0/${path}`)).json();
	}

	async #post(path: string, data: object): Promise<Contracts.KeyValuePair> {
		return (await this.httpClient.post(`${this.#host()}/v1.0/${path}`, data)).json();
	}

	#host(): string {
		return Helpers.randomHostFromConfig(this.configRepository);
	}
}
