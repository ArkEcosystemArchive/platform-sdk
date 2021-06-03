import { Contracts } from "@arkecosystem/platform-sdk";
import { CURRENCIES } from "@arkecosystem/platform-sdk-intl";

import { convertToCurrency } from "../utils";
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
	// All prices on the CoinCap API are standardized in USD (United States Dollar)
	/**
	 *
	 *
	 * @private
	 * @type {string}
	 * @memberof MarketTransformer
	 */
	private readonly baseCurrency: string = "USD";

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
		const tokenId = options.token.toUpperCase();
		const result = {};

		for (const currency of Object.keys(options.currencies || CURRENCIES)) {
			const { assets, rates } = this.data;

			if (!assets[currency]) {
				continue;
			}

			result[currency] = {
				currency,
				price: convertToCurrency(1, {
					from: currency,
					to: tokenId,
					base: this.baseCurrency,
					rates,
				}),
				marketCap: this.#normalise(assets[tokenId].marketCapUsd, rates, currency),
				volume: this.#normalise(assets[tokenId].volumeUsd24Hr, rates, currency),
				date: new Date(this.data.timestamp),
				change24h: null,
			};
		}

		return result;
	}

	#normalise(marketCapUsd: number, rates: object, currency: string): number {
		return marketCapUsd * (rates[this.baseCurrency] / rates[currency]);
	}
}
