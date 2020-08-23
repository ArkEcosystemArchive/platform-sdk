import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { transformTransactionData } from "../../dto/transaction-mapper";

import { promiseAllSettledByKey } from "../../helpers/promise";
import { Wallet } from "../../wallets/wallet";

type HistoryMethod = string;
type HistoryWallet = Coins.TransactionDataCollection;

export class TransactionAggregate {
	// @TODO: add typehint
	readonly #profile;

	#history: Record<HistoryMethod, Record<string, HistoryWallet>> = {};

	// @TODO: add typehint
	public constructor(profile) {
		this.#profile = profile;
	}

	public async transactions(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("transactions", query);
	}

	public async sentTransactions(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("sentTransactions", query);
	}

	public async receivedTransactions(
		query: Contracts.ClientPagination = {},
	): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("receivedTransactions", query);
	}

	public hasMore(method: string): boolean {
		return Object.values(this.#history[method] || {})
			.map((response) => response.hasMorePages())
			.includes(true);
	}

	public flush(): void {
		this.#history = {};
	}

	private async aggregate(
		method: string,
		query: Contracts.ClientPagination,
	): Promise<Coins.TransactionDataCollection> {
		if (!this.#history[method]) {
			this.#history[method] = {};
		}

		const syncedWallets: Wallet[] = this.getWallets();

		const requests: Record<string, Promise<Coins.TransactionDataCollection>> = {};

		for (const syncedWallet of syncedWallets) {
			requests[syncedWallet.id()] = new Promise((resolve, reject) => {
				const lastResponse: HistoryWallet = this.#history[method][syncedWallet.id()];

				if (lastResponse && !lastResponse.hasMorePages()) {
					return reject(
						`Fetched all transactions for ${syncedWallet.id()}. Call [#flush] if you want to reset the history.`,
					);
				}

				if (lastResponse && lastResponse.hasMorePages()) {
					return resolve(syncedWallet[method]({ cursor: lastResponse.nextPage(), ...query }));
				}

				return resolve(syncedWallet[method](query));
			});
		}

		const responses = await promiseAllSettledByKey<Coins.TransactionDataCollection>(requests);
		const result: Contracts.TransactionDataTypeCollection = [];

		for (const [id, request] of Object.entries(responses || {})) {
			if (request.status === "rejected" || request.value instanceof Error) {
				continue;
			}

			if (request.value.isEmpty()) {
				continue;
			}

			for (const transaction of request.value.items()) {
				result.push(transformTransactionData(this.getWallet(id), transaction));
			}

			this.#history[method][id] = request.value;
		}

		return new Coins.TransactionDataCollection(result, {
			prev: undefined,
			self: undefined,
			next: Number(this.hasMore(method)),
		});
	}

	private getWallet(id: string): Wallet {
		return this.#profile.wallets().findById(id);
	}

	private getWallets(): Wallet[] {
		return this.#profile
			.wallets()
			.values()
			.filter((wallet: Wallet) => wallet.hasSyncedWithNetwork());
	}
}
