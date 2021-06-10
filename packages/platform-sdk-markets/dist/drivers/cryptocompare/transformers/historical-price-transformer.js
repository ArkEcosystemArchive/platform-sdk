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
		const datasets = this.data.map((value) => value.close);
		return {
			labels: this.data.map((value) =>
				platform_sdk_intl_1.DateTime.make(value.time * 1000).format(options.dateFormat),
			),
			datasets,
			min: Math.min(...datasets),
			max: Math.max(...datasets),
		};
	}
}
exports.HistoricalPriceTransformer = HistoricalPriceTransformer;
//# sourceMappingURL=historical-price-transformer.js.map
