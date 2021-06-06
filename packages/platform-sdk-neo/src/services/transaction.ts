import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { api, wallet } from "@cityofzion/neon-js";
import { v4 as uuidv4 } from "uuid";

import { SignedTransactionData } from "../dto";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #decimals: number;

	public constructor(config: Coins.ConfigRepository) {
		super();

		this.#decimals = config.get(Coins.ConfigKey.CurrencyDecimals);
	}

	public static async __construct(config: Coins.ConfigRepository): Promise<TransactionService> {
		return new TransactionService(config);
	}

	public async transfer(
		input: Services.TransferInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		try {
			const signedTransaction = {
				account: new wallet.Account(input.signatory.signingKey()),
				intents: api.makeIntent(
					{ NEO: parseFloat(input.data.amount.toString()), GAS: parseFloat(input.fee!.toString()) },
					input.data.to,
				),
			};

			const signedData = { ...signedTransaction, timestamp: DateTime.make() };

			return this.dataTransferObjectService.signedTransaction(uuidv4(), signedData, JSON.stringify(signedTransaction), this.#decimals);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
