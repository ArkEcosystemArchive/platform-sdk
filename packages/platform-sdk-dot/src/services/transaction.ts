import { Coins, Contracts, Exceptions, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { ApiPromise } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import { waitReady } from "@polkadot/wasm-crypto";

import { createRpcClient } from "../helpers";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	#client!: ApiPromise;
	#keyring!: Keyring;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		// @TODO
		// this.#client = await createRpcClient(this.configRepository);
		this.#keyring = new Keyring({ type: "sr25519" });
	}

	public async __destruct(): Promise<void> {
		await this.#client.disconnect();
	}

	public async transfer(
		input: Services.TransferInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		if (input.signatory.signingKey() === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "input.signatory");
		}

		const amount = Helpers.toRawUnit(input.data.amount, this.configRepository).toString();
		const keypair = this.#keyring.addFromMnemonic(input.signatory.signingKey());
		const transaction = await this.#client.tx.balances.transfer(input.data.to, amount).signAsync(keypair);

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
