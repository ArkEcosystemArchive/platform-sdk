import { Contracts } from "@arkecosystem/platform-sdk";

import {
	DailyAverageOptions,
	HistoricalData,
	HistoricalPriceOptions,
	HistoricalVolumeOptions,
	MarketDataCollection,
	PriceTracker,
} from "../../../contracts";

/**
 * Implements a transformer for historical market data.
 *
 * @export
 * @class MarketTransformer
 * @implements {MarketTransformer}
 */
export class MarketTransformer implements MarketTransformer {
	/**
	 * Creates an instance of MarketTransformer.
	 *
	 * @param {Contracts.KeyValuePair} data
	 * @memberof MarketTransformer
	 */
	public constructor(private readonly data: Contracts.KeyValuePair) {}

	/**
	 * Transforms the given data into a normalised format.
	 *
	 * @param {Contracts.KeyValuePair} options
	 * @returns {MarketDataCollection}
	 * @memberof MarketTransformer
	 */
	public transform(options: Contracts.KeyValuePair): MarketDataCollection {
		const result = {};

		for (const value of Object.values(this.data)) {
			result[value.TOSYMBOL] = {
				currency: value.TOSYMBOL,
				price: value.PRICE,
				marketCap: value.MKTCAP,
				volume: value.TOTALVOLUME24HTO,
				date: new Date(value.LASTUPDATE * 1000),
				change24h: value.CHANGEPCT24HOUR,
			};
		}

		return result;
	}
}
