import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { ExtendedTransactionData } from "../../dto/transaction";
import { ExtendedTransactionDataCollection } from "../../dto/transaction-collection";
import { transformTransactionData, transformTransactionDataCollection } from "../../dto/transaction-mapper";
import { promiseAllSettledByKey } from "../../helpers/promise";
import { ReadWriteWallet } from "../../wallets/wallet.models";
import { ProfileContract } from "../profile.models";

type HistoryMethod = string;
type HistoryWallet = ExtendedTransactionDataCollection;

export class EntityAggregate {
	readonly #profile: ProfileContract;

	#history: Record<HistoryMethod, Record<string, HistoryWallet>> = {};

	public constructor(profile: ProfileContract) {
		this.#profile = profile;
	}

	public registrations(type: number, subType?: number | undefined, query: Contracts.ClientPagination = {}) {
		return this.aggregate(type, subType, "register", query);
	}

	public resignations(type: number, subType?: number | undefined, query: Contracts.ClientPagination = {}) {
		return this.aggregate(type, subType, "resign", query);
	}

	public updates(type: number, subType?: number | undefined, query: Contracts.ClientPagination = {}) {
		return this.aggregate(type, subType, "update", query);
	}

	public hasMore(method: string): boolean {
		return Object.values(this.#history[method] || {})
			.map((response) => response.hasMorePages())
			.includes(true);
	}

	public flush(): void {
		this.#history = {};
	}

	protected async aggregate(
		entityType: number,
		entitySubType: number | undefined,
		entityAction: string | undefined,
		query: Contracts.ClientPagination,
	): Promise<ExtendedTransactionDataCollection> {
		const historyKey = `${entityType}.${entitySubType}.${entityAction}`;

		if (!this.#history[historyKey]) {
			this.#history[historyKey] = {};
		}

		const syncedWallets: ReadWriteWallet[] = this.getWallets();

		const requests: Record<string, Promise<Coins.TransactionDataCollection>> = {};

		for (const syncedWallet of syncedWallets) {
			requests[syncedWallet.id()] = new Promise((resolve, reject) => {
				const lastResponse: HistoryWallet = this.#history[historyKey][syncedWallet.id()];

				if (lastResponse && !lastResponse.hasMorePages()) {
					return reject(
						`Fetched all transactions for ${syncedWallet.id()}. Call [#flush] if you want to reset the history.`,
					);
				}

				query = {
					...query,
					// @ts-ignore
					entityType,
					entitySubType,
					entityAction,
					senderPublicKey: syncedWallet.publicKey(),
				};

				if (lastResponse && lastResponse.hasMorePages()) {
					return resolve(syncedWallet.client().transactions({ cursor: lastResponse.nextPage(), ...query }));
				}

				return resolve(syncedWallet.client().transactions(query));
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

			this.#history[historyKey][id] = request.value;
		}

		return new ExtendedTransactionDataCollection(result, {
			prev: undefined,
			self: undefined,
			next: Number(this.hasMore(historyKey)),
		});
	}

	private getWallet(id: string): ReadWriteWallet {
		return this.#profile.wallets().findById(id);
	}

	private getWallets(): ReadWriteWallet[] {
		return this.#profile
			.wallets()
			.values()
			.filter((wallet: ReadWriteWallet) => wallet.hasSyncedWithNetwork());
	}
}
