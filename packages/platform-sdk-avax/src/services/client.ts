import { Coins, Collections, Contracts, Helpers, Services } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";
import { uniq } from "@arkecosystem/utils";
import { AVMAPI, Tx } from "avalanche/dist/apis/avm";
import { PlatformVMAPI } from "avalanche/dist/apis/platformvm";

import { TransactionData, WalletData } from "../dto";
import * as TransactionDTO from "../dto";
import { cb58Decode, usePChain, useXChain } from "./helpers";

export class ClientService extends Services.AbstractClientService {
	readonly #config: Coins.Config;
	readonly #xchain: AVMAPI;
	readonly #pchain: PlatformVMAPI;
	readonly #decimals: number;

	private constructor(config: Coins.Config) {
		super();

		this.#config = config;
		this.#xchain = useXChain(config);
		this.#pchain = usePChain(config);
		this.#decimals = config.get(Coins.ConfigKey.CurrencyDecimals);
	}

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService(config);
	}

	public async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const transaction = new Tx();
		transaction.fromString(await this.#xchain.getTx(id));

		const unsignedTransaction = transaction.getUnsignedTx();
		const baseTransaction = unsignedTransaction.getTransaction();

		const assetId = cb58Decode(this.#config.get("network.meta.assetId"));

		return new TransactionData({
			id,
			amount: unsignedTransaction.getOutputTotal(assetId).toString(),
			fee: unsignedTransaction.getBurn(assetId).toString(),
			memo: baseTransaction.getMemo().toString("utf-8"),
		}).withDecimals(this.#decimals);
	}

	public async transactions(query: Services.ClientTransactionsInput): Promise<Collections.TransactionDataCollection> {
		const { transactions } = await this.#get("v2/transactions", {
			chainID: this.#config.get("network.meta.blockchainId"),
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
				last: undefined,
			},
			TransactionDTO,
			this.#decimals,
		);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const { balance }: any = await this.#xchain.getBalance(id, this.#config.get("network.meta.assetId"));

		return new WalletData({
			address: id,
			balance: balance,
		});
	}

	public async delegates(query?: Contracts.KeyValuePair): Promise<Collections.WalletDataCollection> {
		const validators: string[] = await this.#pchain.sampleValidators(10000);

		return new Collections.WalletDataCollection(
			uniq(validators).map((validator: string) => new WalletData({ address: validator, balance: 0 })),
			{
				prev: undefined,
				self: undefined,
				next: undefined,
				last: undefined,
			},
		);
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			try {
				const hash: string = await this.#xchain.issueTx(transaction.toBroadcast());

				transaction.setAttributes({ identifier: hash });

				result.accepted.push(hash);
			} catch (error) {
				result.rejected.push(transaction.id());

				result.errors[transaction.id()] = error.message;
			}
		}

		return result;
	}

	async #get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return (
			await this.#config
				.get<HttpClient>(Coins.ConfigKey.HttpClient)
				.get(`${this.#host()}/${path}`, query?.searchParams)
		).json();
	}

	#host(): string {
		return Helpers.randomHostFromConfig(this.#config, "archival");
	}
}
