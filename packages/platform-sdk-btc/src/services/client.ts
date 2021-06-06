import { Coins, Contracts, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	readonly #broadcastErrors: Record<string, string> = {
		"bad-txns-inputs-duplicate": "ERR_INPUTS_DUPLICATE",
		"bad-txns-in-belowout": "ERR_IN_BELOWOUT",
		"bad-txns-vout-negative": "ERR_VOUT_NEGATIVE",
		"bad-txns-vout-toolarge": "ERR_VOUT_TOOLARGE",
		"bad-txns-txouttotal-toolarge": "ERR_TXOUTTOTAL_TOOLARGE",
	};

	public async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		return this.dataTransferObjectService.transaction(
			await this.#get(`transactions/${id}`),
			TransactionDTO,
		).withDecimals(this.configRepository.get<number>(Coins.ConfigKey.CurrencyDecimals));
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		return new WalletData(await this.#get(`wallets/${id}`));
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const transactionId: string = transaction.id(); // todo: get the transaction ID

			if (!transactionId) {
				throw new Error("Failed to compute the transaction ID.");
			}

			const response = await this.#post("transactions", { transactions: [transaction.toBroadcast()] });

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

	async #get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.httpClient.get(`${Helpers.randomHostFromConfig(this.configRepository)}/${path}`, query);

		return response.json();
	}

	async #post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.httpClient.post(`${Helpers.randomHostFromConfig(this.configRepository)}/${path}`, body);

		return response.json();
	}
}
