import { Coins, Contracts, Exceptions, Helpers, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { ApiPromise } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import { waitReady } from "@polkadot/wasm-crypto";

import { SignedTransactionData } from "../dto/signed-transaction";
import { createRpcClient } from "../helpers";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #config: Coins.Config;
	readonly #client: ApiPromise;
	readonly #keyring: Keyring;

	public constructor(config: Coins.Config, client: ApiPromise) {
		super();

		this.#config = config;
		this.#client = client;
		this.#keyring = new Keyring({ type: "sr25519" });
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		await waitReady();

		return new TransactionService(config, await createRpcClient(config));
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

		const amount = Helpers.toRawUnit(input.data.amount, this.#config).toString();
		const keypair = this.#keyring.addFromMnemonic(input.signatory.signingKey());
		const transaction = await this.#client.tx.balances.transfer(input.data.to, amount).signAsync(keypair);

		const signedData = {
			...JSON.parse(transaction.toString()),
			timestamp: DateTime.make(),
		};

		return new SignedTransactionData(
			transaction.hash.toHex(),
			signedData,
			transaction.toHex(),
			this.#config.get(Coins.ConfigKey.CurrencyDecimals),
		);
	}
}
