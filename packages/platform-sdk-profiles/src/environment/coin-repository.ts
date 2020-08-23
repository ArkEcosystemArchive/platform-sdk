import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { DataRepository } from "../repositories/data-repository";
import { makeCoin } from "./container.helpers";

export class CoinRepository {
	readonly #dataRepository: DataRepository = new DataRepository();

	public delegates(coin: string, network: string): any {
		return this.#dataRepository.get(`${coin}.${network}.delegates`);
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
}
