import { Collections, Contracts, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	public override async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const response = await this.#get(`txs/${id}`);

		return this.dataTransferObjectService.transaction(response);
	}

	public override async transactions(
		query: Services.ClientTransactionsInput,
	): Promise<Collections.TransactionDataCollection> {
		const page = Number(query.cursor || 1);

		const response = await this.#get("txs", {
			"message.action": "send",
			"message.sender": query.address,
			page,
			limit: query.limit || 100,
		});

		return this.dataTransferObjectService.transactions(response.txs, {
			prev: page <= 1 ? undefined : page - 1,
			self: Number(response.page_number),
			next: page >= Number(response.page_total) ? undefined : page,
			last: response.page_total,
		});
	}

	public override async wallet(id: string): Promise<Contracts.WalletData> {
		const { result: details } = await this.#get(`auth/accounts/${id}`);
		const { result: balance } = await this.#get(`bank/balances/${id}`);

		return this.dataTransferObjectService.wallet({
			address: details.value.address,
			publicKey: details.value.public_key.value,
			balance: Object.values(balance).find(({ denom }: any) => denom === "uatom"),
			sequence: details.value.sequence,
		});
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
			const { logs, txhash } = await this.#post("txs", { mode: "block", tx: transaction });

			transaction.setAttributes({ identifier: txhash });

			if (logs[0].success === true) {
				result.accepted.push(txhash);
			} else {
				const { message } = JSON.parse(logs[0].log);

				if (message) {
					result.rejected.push(txhash);

					result.errors[txhash] = message;
				}
			}
		}

		return result;
	}

	async #get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.httpClient.get(
			`${Helpers.randomHostFromConfig(this.configRepository)}/${path}`,
			query,
		);

		return response.json();
	}

	async #post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.httpClient.post(
			`${Helpers.randomHostFromConfig(this.configRepository)}/${path}`,
			body,
		);

		return response.json();
	}
}
