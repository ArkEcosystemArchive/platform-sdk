import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { Wallet } from "../wallet";

export class TransactionAggregate {
	// @TODO: add typehint
	readonly #profile;

	// @TODO: add typehint
	public constructor(profile) {
		this.#profile = profile;
	}

	public async transactions(page?: number): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("transactions", page);
	}

	public async sentTransactions(page?: number): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("sentTransactions", page);
	}

	public async receivedTransactions(page?: number): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("receivedTransactions", page);
	}

	private async aggregate(method: string, page?: number): Promise<Coins.TransactionDataCollection> {
		const result: Contracts.TransactionDataTypeCollection = [];

		const requests: PromiseSettledResult<Coins.TransactionDataCollection>[] = Object.values(
			await Promise.allSettled(
				this.#profile
					.wallets()
					.values()
					.filter((wallet: Wallet) => wallet.hasSyncedWithNetwork())
					.map((wallet: Wallet) => wallet[method]({ page })),
			),
		);

		for (const request of requests) {
			if (request.status === "rejected") {
				continue;
			}

			for (const transaction of request.value.items()) {
				result.push(transaction);
			}
		}

		// TODO: decide how to handle pagination for aggregated data collections
		return new Coins.TransactionDataCollection(result, { prev: undefined, self: undefined, next: undefined });
	}
}
