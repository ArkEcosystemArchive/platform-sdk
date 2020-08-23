import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { transformTransactionData } from "../../dto/transaction-mapper";
import { ReadWriteWallet } from "../wallet.models";

export class EntityAggregate {
	readonly #wallet: ReadWriteWallet;

	public constructor(wallet: ReadWriteWallet) {
		this.#wallet = wallet;
	}

	protected async aggregate(
		entityType: string,
		entityAction: string,
		query: Contracts.ClientPagination,
	): Promise<Coins.TransactionDataCollection> {
		const result = await this.#wallet.client().transactions({
			...query,
			// @ts-ignore - TODO: We need to expand the properties that are allowed to be passed to be transaction search methods.
			entityType,
			entityAction,
			senderPublicKey: this.#wallet.publicKey(),
		});

		result.transform((transaction) => transformTransactionData(this.#wallet, transaction));

		return result;
	}
}
