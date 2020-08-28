import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { DataRepository } from "../repositories/data-repository";
import { makeCoin } from "./container.helpers";

export class CoinRepository {
	readonly #dataRepository: DataRepository = new DataRepository();

	public delegates(coin: string, network: string): any {
		const result = this.#dataRepository.get(`${coin}.${network}.delegates`);

		if (result === undefined) {
			throw new Error(
				`The delegates for [${coin}.${network}] have not been synchronized yet. Please call [syncDelegates] before using this method.`,
			);
		}

		return result;
	}

	public fees(coin: string, network: string, days = 7): any {
		const result = this.#dataRepository.get(`${coin}.${network}.fees.${days}`);

		if (result === undefined) {
			throw new Error(
				`The delegates for [${coin}.${network}.fees.${days}] have not been synchronized yet. Please call [syncFees] before using this method.`,
			);
		}

		return result;
	}

	public async syncDelegates(coin: string, network: string): Promise<void> {
		const instance: Coins.Coin = await makeCoin(coin, network);
		const instanceKey = `${coin}.${network}.delegates`;

		let result: Contracts.WalletData[] = [];
		let hasMore = true;
		// TODO: use the nextPage() method as cursor like aggregates
		let cursor = 1;

		while (hasMore) {
			const response = await instance.client().delegates({ cursor });

			result = result.concat(response.items());

			hasMore = response.hasMorePages();

			cursor++;
		}

		this.#dataRepository.set(
			instanceKey,
			result.map((delegate: Contracts.WalletData) => delegate.toObject()),
		);
	}

	public async syncFees(coin: string, network: string, days = 7): Promise<void> {
		const instance: Coins.Coin = await makeCoin(coin, network);

		this.#dataRepository.set(`${coin}.${network}.fees.${days}`, await instance.fee().all(days));
	}
}
