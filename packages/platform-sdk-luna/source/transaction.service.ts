import { Contracts, Helpers, Services } from "@arkecosystem/platform-sdk";
import { UUID } from "@arkecosystem/platform-sdk-crypto";
import { LCDClient, MnemonicKey, MsgSend } from "@terra-money/terra.js";

import { useClient } from "./helpers";

export class TransactionService extends Services.AbstractTransactionService {
	public override async transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData> {
		const amount = this.toSatoshi(input.data.amount).toString();

		const transaction = await this.#useClient()
			.wallet(new MnemonicKey({ mnemonic: input.signatory.signingKey() }))
			.createAndSignTx({
				msgs: [new MsgSend(input.signatory.address(), input.data.to, { uluna: amount })],
				memo: input.data.memo,
			});

		return this.dataTransferObjectService.signedTransaction(
			UUID.random(),
			transaction.toData(),
			transaction.toJSON(),
		);
	}

	#useClient(): LCDClient {
		return useClient(
			`${Helpers.randomHostFromConfig(this.configRepository)}/api`,
			this.configRepository.get("network.meta.networkId"),
		);
	}
}
