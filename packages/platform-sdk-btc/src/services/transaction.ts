import { Contracts, Exceptions, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { Transaction } from "bitcore-lib";

import { UnspentTransaction } from "../contracts";
import { UnspentAggregator } from "../utils/unspent-aggregator";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	@IoC.inject(IoC.BindingType.AddressService)
	private readonly addressService!: Services.AddressService;

	// @TODO: bind via service provider and inject
	#unspent;

	public async transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData> {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "input.signatory");
			}

			// NOTE: this is a WIF/PrivateKey - should probably be passed in as wif instead of mnemonic

			// 1. Derive the sender address
			const { address } = await this.addressService.fromWIF(input.signatory.signingKey());
			// ({ wif: input.signatory.signingKey() });

			// 2. Aggregate the unspent transactions
			const unspent: UnspentTransaction[] = await this.#unspent.aggregate(address);

			// 3. Compute the amount to be transfered
			const amount = Helpers.toRawUnit(input.data.amount, this.configRepository).toNumber();

			// 4. Build and sign the transaction
			let transaction = new Transaction().from(unspent).to(input.data.to, amount).change(address);

			// 5. Set a fee if configured. If none is set the fee will be estimated by bitcore-lib.
			if (input.fee) {
				const fee = Helpers.toRawUnit(input.fee, this.configRepository).toNumber();
				transaction = transaction.fee(fee);
			}

			return transaction.sign(input.signatory.signingKey()).toString();
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#unspent = new UnspentAggregator({
			http: this.httpClient,
			peer: Helpers.randomHostFromConfig(this.configRepository),
		});
	}
}
