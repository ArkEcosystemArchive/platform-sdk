import { Contracts } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";

import { convertToCurrency } from "../utils";

/**
 * Implements a transformer for historical volume data.
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
		const { token, currency, rates, dateFormat } = options;

		const tokenId = token.toUpperCase();
		const datasets = {};

		for (const value of Object.values(this.data)) {
			datasets[DateTime.make(value.date).format(dateFormat)] = convertToCurrency(value.priceUsd, {
				from: currency,
				to: tokenId,
				base: tokenId,
				rates,
			});
		}

		const datasetValues: number[] = Object.values(datasets);

		return {
			labels: Object.keys(datasets),
			datasets: datasetValues,
			min: Math.min(...datasetValues),
			max: Math.max(...datasetValues),
		};
	}
}
