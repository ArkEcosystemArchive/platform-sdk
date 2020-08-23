import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { transformTransactionData } from "../../dto/transaction-mapper";

import { promiseAllSettledByKey } from "../../helpers/promise";
import { Wallet } from "../../wallets/wallet";

type HistoryMethod = string;
type HistoryWallet = Coins.TransactionDataCollection;

export class EntityAggregate {
	// @TODO: add typehint
	readonly #wallet;

	// @TODO: add typehint
	public constructor(wallet) {
		this.#wallet = wallet;
	}

	protected async aggregate(
		entityType: string,
		entityAction: string,
		query: Contracts.ClientPagination,
	): Promise<Coins.TransactionDataCollection> {
		const result = this.#wallet.client().transactions({
			...query,
			entityType,
			entityAction,
			senderPublicKey: this.#wallet.publicKey(),
		});

		result.transform((transaction) => transformTransactionData(this.#wallet, transaction));

		return result;
	}
}
