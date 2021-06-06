import { Coins, Contracts, Exceptions, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";
import { Transaction } from "bitcore-lib";

import { UnspentTransaction } from "../contracts";
import { UnspentAggregator } from "../utils/unspent-aggregator";
import { IdentityService } from "./identity";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	readonly #config: Coins.Config;
	readonly #identity;
	readonly #unspent;

	private constructor(opts: Contracts.KeyValuePair) {
		super();

		this.#config = opts.config;
		this.#identity = opts.identity;
		this.#unspent = opts.unspent;
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		const unspent: UnspentAggregator = new UnspentAggregator({
			http: config.get<HttpClient>(Coins.ConfigKey.HttpClient),
			peer: Helpers.randomHostFromConfig(config),
		});

		return new TransactionService({
			identity: await IdentityService.__construct(config),
			unspent,
		});
	}

	public async transfer(
		input: Services.TransferInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "input.signatory");
			}

			// NOTE: this is a WIF/PrivateKey - should probably be passed in as wif instead of mnemonic

			// 1. Derive the sender address
			const senderAddress: string = await this.#identity.address().fromWIF(input.signatory.signingKey());
			// ({ wif: input.signatory.signingKey() });

			// 2. Aggregate the unspent transactions
			const unspent: UnspentTransaction[] = await this.#unspent.aggregate(senderAddress);

			// 3. Compute the amount to be transfered
			const amount = Helpers.toRawUnit(input.data.amount, this.#config).toNumber();

			// 4. Build and sign the transaction
			let transaction = new Transaction().from(unspent).to(input.data.to, amount).change(senderAddress);

			// 5. Set a fee if configured. If none is set the fee will be estimated by bitcore-lib.
			if (input.fee) {
				const fee = Helpers.toRawUnit(input.fee, this.#config).toNumber();
				transaction = transaction.fee(fee);
			}

			return transaction.sign(input.signatory.signingKey()).toString();
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
