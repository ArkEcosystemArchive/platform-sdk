import { Contracts } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";

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
 * Implements a transformer for historical price data.
 *
 * @export
 * @class HistoricalPriceTransformer
 * @implements {HistoricalTransformer}
 */
export class HistoricalPriceTransformer implements HistoricalTransformer {
	/**
	 * Creates an instance of HistoricalPriceTransformer.
	 *
	 * @param {Contracts.KeyValuePair} data
	 * @memberof HistoricalPriceTransformer
	 */
	public constructor(private readonly data: Contracts.KeyValuePair) {}

	/**
	 * Transforms the given data into a normalised format.
	 *
	 * @param {Contracts.KeyValuePair} options
	 * @returns {HistoricalData}
	 * @memberof HistoricalPriceTransformer
	 */
	public transform(options: Contracts.KeyValuePair): HistoricalData {
		const datasets = this.data.map((value) => value.close);

		return {
			labels: this.data.map((value) => DateTime.make(value.time * 1000).format(options.dateFormat)),
			datasets,
			min: Math.min(...datasets),
			max: Math.max(...datasets),
		};
	}
}
