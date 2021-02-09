import { Coins, Contracts, Exceptions, Helpers } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { AVMAPI, Tx } from "avalanche/dist/apis/avm";

import { TransactionData, WalletData } from "../dto";
import * as TransactionDTO from "../dto";
import { cb58Decode, useChain } from "./helpers";

export class ClientService implements Contracts.ClientService {
	readonly #config: Coins.Config;
	readonly #chain: AVMAPI;

	private constructor(config: Coins.Config) {
		this.#config = config;
		this.#chain = useChain(config);
	}

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService(config);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transaction(id: string): Promise<Contracts.TransactionDataType> {
		const transaction = new Tx();
		transaction.fromString(await this.#chain.getTx(id));

		const unsignedTransaction = transaction.getUnsignedTx();
		const baseTransaction = unsignedTransaction.getTransaction();

		const assetId = cb58Decode(this.#config.get("network.crypto.assetId"));

		// @TODO: get block ID it was included in
		return new TransactionData({
			id,
			amount: unsignedTransaction.getOutputTotal(assetId).toString(),
			fee: unsignedTransaction.getBurn(assetId).toString(),
			memo: baseTransaction.getMemo().toString("utf-8"),
		});
	}

	public async transactions(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		const { transactions } = await this.get("v2/transactions", {
			chainID: this.#config.get("network.crypto.blockchainId"),
			limit: 100,
			offset: query.cursor || 0,
			address: query.address,
		});

		return Helpers.createTransactionDataCollectionWithType(
			transactions,
			{
				prev: undefined,
				self: undefined,
				next: undefined,
			},
			TransactionDTO,
		);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const { balance }: any = await this.#chain.getBalance(id, this.#config.get("network.crypto.assetId"));

		return new WalletData({
			address: id,
			balance: balance,
		});
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
			try {
				// @TODO: this is the real ID that will be used but we somehow need to find
				// out this ID before we broadcast it
				result.accepted.push(await this.#chain.issueTx(transaction.toBroadcast()));
			} catch (error) {
				result.rejected.push(transaction.id());

				result.errors[transaction.id()] = error.message;
			}
		}

		return result;
	}

	public async broadcastSpread(
		transactions: Contracts.SignedTransactionData[],
		hosts: string[],
	): Promise<Contracts.BroadcastResponse> {
		throw new Exceptions.NotImplemented(this.constructor.name, "broadcastSpread");
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return (
			await this.#config
				.get<Contracts.HttpClient>("httpClient")
				.get(`${this.host()}/${path}`, query?.searchParams)
		).json();
	}

	private host(): string {
		try {
			return this.#config.get<string>("peer");
		} catch {
			return `${Arr.randomElement(this.#config.get<string[]>("network.networking.hosts"))}:8080`;
		}
	}
}
