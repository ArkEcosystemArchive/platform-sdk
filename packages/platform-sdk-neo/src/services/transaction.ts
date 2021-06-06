import { Coins, Contracts, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { api, wallet } from "@cityofzion/neon-js";
import { v4 as uuidv4 } from "uuid";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
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

			return this.dataTransferObjectService.signedTransaction(
				uuidv4(),
				signedData,
				JSON.stringify(signedTransaction),
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
