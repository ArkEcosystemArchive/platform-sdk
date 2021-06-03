import { Coins, Contracts, Helpers, Services } from "@arkecosystem/platform-sdk";
import { UUID } from "@arkecosystem/platform-sdk-crypto";
import { LCDClient, MnemonicKey, MsgSend } from "@terra-money/terra.js";

import { SignedTransactionData } from "../dto";
import { useClient } from "./helpers";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService(config);
	}

	public async transfer(
		input: Services.TransferInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		const amount = Coins.toRawUnit(input.data.amount, this.#config).toString();

		const transaction = await this.#useClient()
			.wallet(new MnemonicKey({ mnemonic: input.signatory.signingKey() }))
			.createAndSignTx({
				msgs: [new MsgSend(input.signatory.address(), input.data.to, { uluna: amount })],
				memo: input.data.memo,
			});

		return new SignedTransactionData(UUID.random(), transaction.toData(), transaction.toJSON());
	}

	#useClient(): LCDClient {
		return useClient(
			`${Helpers.randomHostFromConfig(this.#config)}/api`,
			this.#config.get("network.meta.networkId"),
		);
	}
}
