"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricalPriceTransformer = void 0;
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
/**
 * Implements a transformer for historical price data.
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
		const datasets = {};
		for (let i = 0; i < this.data.prices.length; i += 24) {
			datasets[this.data.prices[i][0]] = this.data.prices[i][1];
		}
		const datasetValues = Object.values(datasets);
		return {
			labels: Object.keys(datasets).map((time) =>
				platform_sdk_intl_1.DateTime.make(time).format(options.dateFormat),
			),
			datasets: datasetValues,
			min: Math.min(...datasetValues),
			max: Math.max(...datasetValues),
		};
	}
}
exports.HistoricalPriceTransformer = HistoricalPriceTransformer;
//# sourceMappingURL=historical-price-transformer.js.map
