import { Contracts } from "@arkecosystem/platform-sdk";
import { CURRENCIES } from "@arkecosystem/platform-sdk-intl";

import {
	DailyAverageOptions,
	HistoricalData,
	HistoricalPriceOptions,
	HistoricalTransformer,
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

		for (const currency of Object.keys(options.currencies || CURRENCIES)) {
			const currencyLowerCase = currency.toLowerCase();

			if (!this.data.current_price[currencyLowerCase]) {
				continue;
			}

			result[currency] = {
				currency,
				price: this.data.current_price[currencyLowerCase],
				marketCap: this.data.market_cap[currencyLowerCase],
				volume: this.data.total_volume[currencyLowerCase],
				date: new Date(this.data.last_updated),
				change24h: this.data.market_cap_change_percentage_24h_in_currency[currencyLowerCase],
			};
		}

		return result;
	}
}
