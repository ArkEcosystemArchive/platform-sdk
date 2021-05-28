import { Coins, Contracts, Exceptions, Helpers, Services } from "@arkecosystem/platform-sdk";
import { UUID } from "@arkecosystem/platform-sdk-crypto";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { RippleAPI } from "ripple-lib";

import { SignedTransactionData } from "../dto";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #config: Coins.Config;
	readonly #http: Contracts.HttpClient;
	readonly #ripple: RippleAPI;

	private constructor(config: Coins.Config) {
		super();

		this.#config = config;
		this.#http = config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);
		this.#ripple = new RippleAPI();
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService(config);
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new Error("No mnemonic provided.");
			}

			const prepared = await this.#ripple.preparePayment(
				input.signatory.address(),
				{
					source: {
						address: input.signatory.address(),
						maxAmount: {
							value: `${input.data.amount}`,
							currency: "XRP",
						},
					},
					destination: {
						address: input.data.to,
						amount: {
							value: `${input.data.amount}`,
							currency: "XRP",
						},
					},
				},
				{ maxLedgerVersionOffset: 5 },
			);

			const { id, signedTransaction } = await this.post("sign", [
				{
					tx_json: prepared.txJSON,
					secret: input.signatory.signingKey(),
				},
			]);

			const signedData = { ...signedTransaction, timestamp: DateTime.make() };

			return new SignedTransactionData(id, signedData, signedTransaction);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	private async post(method: string, params: any[]): Promise<Contracts.KeyValuePair> {
		return (
			await this.#http.post(Helpers.randomHostFromConfig(this.#config, "full").host, {
				jsonrpc: "2.0",
				id: UUID.random(),
				method,
				params,
			})
		).json().result;
	}
}
