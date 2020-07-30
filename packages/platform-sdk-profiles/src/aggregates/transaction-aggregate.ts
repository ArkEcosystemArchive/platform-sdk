import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export class TransactionAggregate {
	readonly #profile;

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

		const requests: PromiseSettledResult<
			Contracts.CollectionResponse<Coins.TransactionDataCollection>
		>[] = Object.values(
			await Promise.allSettled(
				this.#profile
					.wallets()
					.values()
					.map((wallet) => wallet[method]({ page })),
			),
		);

		for (const request of requests) {
			if (request.status === "rejected") {
				continue;
			}

			for (const transaction of request.value.data.all()) {
				result.push(transaction);
			}
		}

		return new Coins.TransactionDataCollection(result);
	}
}
