import { Coins, Contracts, Exceptions, Helpers } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";
import { broadcastErrors } from "./client.helpers";
import { UUID } from "@arkecosystem/platform-sdk-crypto";

export class ClientService implements Contracts.ClientService {
	readonly #config: Coins.Config;
	readonly #http: Contracts.HttpClient;

	private constructor(config: Coins.Config) {
		this.#config = config;
		this.#http = config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);
	}

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService(config);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transaction(
		id: string,
		input?: Contracts.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const transaction = await this.post("tx", [
			{
				"transaction": id,
				"binary": false
			}
		]);

		return Helpers.createTransactionDataWithType(transaction, TransactionDTO);
	}

	public async transactions(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		const { transactions } = await this.post("account_tx", [
			{
				account: query.address || query.addresses![0],
				limit: query.limit || 15,
			}
		]);

		return Helpers.createTransactionDataCollectionWithType(
			transactions.map(({ tx }) => tx),
			{
				prev: undefined,
				self: undefined,
				next: undefined,
				last: undefined,
			},
			TransactionDTO,
		);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		return new WalletData(
			(await this.post("account_info", [
				{
					"account": id,
					"strict": true,
					"ledger_index": "current"
				}
			])).account_data,
		);
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

	public async syncing(): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, "syncing");
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Contracts.BroadcastResponse> {
		const result: Contracts.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const { engine_result, tx_json } = await this.post("submit", [
				{
					"tx_blob": transaction.toBroadcast(),
				}
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

	private async post(method: string, params: any[]): Promise<Contracts.KeyValuePair> {
		return (
			await this.#http.post(this.host(), {
				jsonrpc: "2.0",
				id: UUID.random(),
				method,
				params,
			})
		).json().result;
	}

	private host(): string {
		return Arr.randomElement(this.#config.get<string[]>("network.networking.hosts"));
	}
}
