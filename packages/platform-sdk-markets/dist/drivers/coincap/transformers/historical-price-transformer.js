"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricalPriceTransformer = void 0;
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const utils_1 = require("../utils");
/**
 * Implements a transformer for historical volume data.
 *
 * @export
 * @class HistoricalPriceTransformer
 * @implements {HistoricalTransformer}
 */
class HistoricalPriceTransformer {
	/**
	 * Creates an instance of HistoricalPriceTransformer.
	 *
	 * @param {Contracts.KeyValuePair} data
	 * @memberof HistoricalPriceTransformer
	 */
	constructor(data) {
		Object.defineProperty(this, "data", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: data,
		});
	}
	/**
	 * Transforms the given data into a normalised format.
	 *
	 * @param {Contracts.KeyValuePair} options
	 * @returns {HistoricalData}
	 * @memberof HistoricalPriceTransformer
	 */
	transform(options) {
		const { token, currency, rates, dateFormat } = options;
		const tokenId = token.toUpperCase();
		const datasets = {};
		for (const value of Object.values(this.data)) {
			datasets[platform_sdk_intl_1.DateTime.make(value.date).format(dateFormat)] = utils_1.convertToCurrency(
				value.priceUsd,
				{
					from: currency,
					to: tokenId,
					base: tokenId,
					rates,
				},
			);
		}
		const datasetValues = Object.values(datasets);
		return {
			labels: Object.keys(datasets),
			datasets: datasetValues,
			min: Math.min(...datasetValues),
			max: Math.max(...datasetValues),
		};
	}
}
exports.HistoricalPriceTransformer = HistoricalPriceTransformer;
//# sourceMappingURL=historical-price-transformer.js.map
