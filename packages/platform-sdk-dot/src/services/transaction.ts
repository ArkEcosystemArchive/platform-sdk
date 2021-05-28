import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { ApiPromise } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import { waitReady } from "@polkadot/wasm-crypto";

import { SignedTransactionData } from "../dto/signed-transaction";
import { createRpcClient } from "../helpers";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #client: ApiPromise;
	readonly #keyring: Keyring;

	public constructor(client: ApiPromise) {
		super();

		this.#client = client;
		this.#keyring = new Keyring({ type: "sr25519" });
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		await waitReady();

		return new TransactionService(await createRpcClient(config));
	}

	public async __destruct(): Promise<void> {
		await this.#client.disconnect();
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		if (input.signatory.signingKey() === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, "transfer", "input.signatory");
		}

		const amount = BigNumber.make(input.data.amount).times(1e10).toString();
		const keypair = this.#keyring.addFromMnemonic(input.signatory.signingKey());
		const transaction = await this.#client.tx.balances.transfer(input.data.to, amount).signAsync(keypair);

		const signedData = {
			...JSON.parse(transaction.toString()),
			timestamp: DateTime.make(),
		};

		return new SignedTransactionData(transaction.hash.toHex(), signedData, transaction.toHex());
	}
}
