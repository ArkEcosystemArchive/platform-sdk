import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { IReadWriteWallet, ITransactionAggregate } from "../../../../contracts";
import { ExtendedTransactionDataCollection } from "../../../../dto";

import { ExtendedTransactionData } from "../../../../dto/transaction";
import { transformTransactionData } from "../../../../dto/transaction-mapper";
import { State } from "../../../../environment/state";
import { promiseAllSettledByKey } from "../../../../helpers/promise";

type HistoryMethod = string;
type HistoryWallet = ExtendedTransactionDataCollection;

type AggregateQuery = {
	addresses?: string[];
} & Contracts.ClientPagination;

export class TransactionAggregate implements ITransactionAggregate {
	#history: Record<HistoryMethod, Record<string, HistoryWallet>> = {};

	public async all(query: AggregateQuery = {}): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("all", query);
	}

	public async sent(query: AggregateQuery = {}): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("sent", query);
	}

	public async received(query: AggregateQuery = {}): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("received", query);
	}

	public hasMore(method: string): boolean {
		return Object.values(this.#history[method] || {})
			.map((response) => response.hasMorePages())
			.includes(true);
	}

	public flush(method?: string): void {
		if (method) {
			this.#history[method] = {};
			return;
		}

		this.#history = {};
	}

	private async aggregate(method: string, query: AggregateQuery): Promise<ExtendedTransactionDataCollection> {
		if (!this.#history[method]) {
			this.#history[method] = {};
		}

		const syncedWallets: IReadWriteWallet[] = this.getWallets(query.addresses);

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
					return resolve(syncedWallet.transactionIndex()[method]({ cursor: lastResponse.nextPage(), ...query }));
				}

				return resolve(syncedWallet.transactionIndex()[method](query));
			});
		}

		const responses = await promiseAllSettledByKey<ExtendedTransactionDataCollection>(requests);
		const result: ExtendedTransactionData[] = [];

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

		return new ExtendedTransactionDataCollection(result, {
			prev: undefined,
			self: undefined,
			next: Number(this.hasMore(method)),
			last: undefined,
		});
	}

	private getWallet(id: string): IReadWriteWallet {
		return State.profile().wallets().findById(id);
	}

	private getWallets(addresses: string[] = []): IReadWriteWallet[] {
		return State.profile()
			.wallets()
			.values()
			.filter((wallet: IReadWriteWallet) => {
				const matchesAddress = addresses.length > 0 ? addresses.includes(wallet.address()) : true;
				return matchesAddress && wallet.hasSyncedWithNetwork();
			});
	}
}
