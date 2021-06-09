import { Contracts, Exceptions, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { ApiPromise } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";

import { BindingType } from "../constants";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	@IoC.inject(BindingType.ApiPromise)
	protected readonly client!: ApiPromise;

	@IoC.inject(BindingType.Keyring)
	protected readonly keyring!: Keyring;

	public async __destruct(): Promise<void> {
		await this.client.disconnect();
	}

	public async transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData> {
		if (input.signatory.signingKey() === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "input.signatory");
		}

		const amount = Helpers.toRawUnit(input.data.amount, this.configRepository).toString();
		const keypair = this.keyring.addFromMnemonic(input.signatory.signingKey());
		const transaction = await this.client.tx.balances.transfer(input.data.to, amount).signAsync(keypair);

		const signedData = {
			...JSON.parse(transaction.toString()),
			timestamp: DateTime.make(),
		};

		return this.dataTransferObjectService.signedTransaction(
			transaction.hash.toHex(),
			signedData,
			transaction.toHex(),
		);
	}
}
