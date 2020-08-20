import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { promiseAllSettledByKey } from "../../helpers/promise";
import { Wallet } from "../../wallets/wallet";

type HistoryMethod = string;
type HistoryWallet = Coins.TransactionDataCollection;

export class RegistrationAggregate {
	// @TODO: add typehint
	readonly #profile;

	#history: Record<HistoryMethod, Record<string, HistoryWallet>> = {};

	// @TODO: add typehint
	public constructor(profile) {
		this.#profile = profile;
	}

	public async all(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("all", "register", query);
	}

	public async businesses(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("business", "register", query);
	}

	public async delegates(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("delegate", "register", query);
	}

	public async plugins(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("plugin", "register", query);
	}

	public async corePlugins(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("corePlugin", "register", query);
	}

	public async desktopWalletPlugins(
		query: Contracts.ClientPagination = {},
	): Promise<Coins.TransactionDataCollection> {
		return this.aggregate("desktopWalletPlugin", "register", query);
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
		entityType: string,
		entityAction: string,
		query: Contracts.ClientPagination,
	): Promise<Coins.TransactionDataCollection> {
		const historyKey = `${entityType}.${entityAction}`;

		if (!this.#history[historyKey]) {
			this.#history[historyKey] = {};
		}

		const syncedWallets: Wallet[] = this.getWallets();

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
					entityAction,
					senderPublicKey: syncedWallet.publicKey(),
				};

				if (lastResponse && lastResponse.hasMorePages()) {
					return resolve(syncedWallet.client().transactions({ cursor: lastResponse.nextPage(), ...query }));
				}

				return resolve(syncedWallet.client().transactions(query));
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
				result.push(transaction);
			}

			this.#history[historyKey][id] = request.value;
		}

		return new Coins.TransactionDataCollection(result, {
			prev: undefined,
			self: undefined,
			next: Number(this.hasMore(historyKey)),
		});
	}

	private getWallets(): Wallet[] {
		return this.#profile
			.wallets()
			.values()
			.filter((wallet: Wallet) => wallet.hasSyncedWithNetwork());
	}
}
