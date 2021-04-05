import { Contracts } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";

/**
 * Implements a transformer for historical price data.
 *
 * @export
 * @class HistoricalPriceTransformer
 * @implements {Contracts.HistoricalTransformer}
 */
export class HistoricalPriceTransformer implements Contracts.HistoricalTransformer {
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
	 * @returns {Contracts.HistoricalData}
	 * @memberof HistoricalPriceTransformer
	 */
	public transform(options: Contracts.KeyValuePair): Contracts.HistoricalData {
		const datasets = {};
		for (let i = 0; i < this.data.prices.length; i += 24) {
			datasets[this.data.prices[i][0]] = this.data.prices[i][1];
		}

		const datasetValues: number[] = Object.values(datasets);

		return {
			labels: Object.keys(datasets).map((time) => DateTime.make(time).format(options.dateFormat)),
			datasets: datasetValues,
			min: Math.min(...datasetValues),
			max: Math.max(...datasetValues),
		};
	}
}
