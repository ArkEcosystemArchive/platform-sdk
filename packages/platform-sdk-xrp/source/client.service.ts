import { Collections, Contracts, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { UUID } from "@arkecosystem/platform-sdk-crypto";

import { WalletData } from "./wallet.dto";
import { broadcastErrors } from "./client.errors";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	public override async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const transaction = await this.#post("tx", [
			{
				transaction: id,
				binary: false,
			},
		]);

		return this.dataTransferObjectService.transaction(transaction);
	}

	public override async transactions(query: Services.ClientTransactionsInput): Promise<Collections.TransactionDataCollection> {
		const { transactions } = await this.#post("account_tx", [
			{
				account: query.address || query.addresses![0],
				limit: query.limit || 15,
			},
		]);

		return this.dataTransferObjectService.transactions(
			transactions.map(({ tx }) => tx),
			{
				prev: undefined,
				self: undefined,
				next: undefined,
				last: undefined,
			},
		);
	}

	public override async wallet(id: string): Promise<Contracts.WalletData> {
		return new WalletData(
			(
				await this.#post("account_info", [
					{
						account: id,
						strict: true,
						ledger_index: "current",
					},
				])
			).account_data,
		);
	}

	public override async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const { engine_result, tx_json } = await this.#post("submit", [
				{
					tx_blob: transaction.toBroadcast(),
				},
			]);

			const transactionId: string = tx_json.hash;

			transaction.setAttributes({ identifier: transactionId });

			if (engine_result === "tesSUCCESS") {
				result.accepted.push(transactionId);
			} else {
				result.rejected.push(transactionId);

				if (!Array.isArray(result.errors[transactionId])) {
					result.errors[transactionId] = [];
				}

				result.errors[transactionId].push(broadcastErrors[engine_result]);
			}
		}

		return result;
	}

	async #post(method: string, params: any[]): Promise<Contracts.KeyValuePair> {
		return (
			await this.httpClient.post(Helpers.randomHostFromConfig(this.configRepository), {
				jsonrpc: "2.0",
				id: UUID.random(),
				method,
				params,
			})
		).json().result;
	}
}
