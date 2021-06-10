"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricalVolumeTransformer = void 0;
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
/**
 * Implements a transformer for historical volume data.
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
		const datasets = {};
		for (let i = 0; i < this.data.total_volumes.length; i += 24) {
			datasets[this.data.total_volumes[i][0]] = this.data.total_volumes[i][1];
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
exports.HistoricalVolumeTransformer = HistoricalVolumeTransformer;
//# sourceMappingURL=historical-volume-transformer.js.map
