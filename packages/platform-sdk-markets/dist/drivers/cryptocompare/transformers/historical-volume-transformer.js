"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricalVolumeTransformer = void 0;
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
/**
 *  Implements a transformer for historical volume data.
 *
 * @export
 * @class HistoricalVolumeTransformer
 * @implements {HistoricalTransformer}
 */
class HistoricalVolumeTransformer {
	/**
	 * Creates an instance of HistoricalVolumeTransformer.
	 *
	 * @param {Contracts.KeyValuePair} data
	 * @memberof HistoricalVolumeTransformer
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
	 * @memberof HistoricalVolumeTransformer
	 */
	transform(options) {
		const datasets = this.data.map((value) => value.volumeto);
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
exports.HistoricalVolumeTransformer = HistoricalVolumeTransformer;
//# sourceMappingURL=historical-volume-transformer.js.map
