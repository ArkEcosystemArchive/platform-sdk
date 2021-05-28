import { Coins, Contracts, Exceptions, Helpers, Services } from "@arkecosystem/platform-sdk";
import BigNumber from "bignumber.js";
import { Transaction } from "bitcore-lib";

import { UnspentTransaction } from "../contracts";
import { UnspentAggregator } from "../utils/unspent-aggregator";
import { IdentityService } from "./identity";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #identity;
	readonly #unspent;

	private constructor(opts: Contracts.KeyValuePair) {
		super();

		this.#identity = opts.identity;
		this.#unspent = opts.unspent;
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		const unspent: UnspentAggregator = new UnspentAggregator({
			http: config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient),
			peer: Helpers.randomHostFromConfig(config),
		});

		return new TransactionService({
			identity: await IdentityService.__construct(config),
			unspent,
		});
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new Error("No mnemonic provided.");
			}

			// NOTE: this is a WIF/PrivateKey - should probably be passed in as wif instead of mnemonic

			// 1. Derive the sender address
			const senderAddress: string = await this.#identity.address().fromWIF(input.signatory.signingKey());
			// ({ wif: input.signatory.signingKey() });

			// 2. Aggregate the unspent transactions
			const unspent: UnspentTransaction[] = await this.#unspent.aggregate(senderAddress);

			// 3. Compute the amount to be transfered
			const amount: number = new BigNumber(input.data.amount).toNumber();

			// 4. Build and sign the transaction
			let transaction = new Transaction().from(unspent).to(input.data.to, amount).change(senderAddress);

			// 5. Set a fee if configured. If none is set the fee will be estimated by bitcore-lib.
			if (input.fee) {
				transaction = transaction.fee(input.fee);
			}

			return transaction.sign(input.signatory.signingKey()).toString();
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
