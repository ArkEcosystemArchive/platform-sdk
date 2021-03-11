import { Contracts } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";

/**
 *
 *
 * @export
 * @class HistoricalVolumeTransformer
 * @implements {Contracts.HistoricalTransformer}
 */
export class HistoricalVolumeTransformer implements Contracts.HistoricalTransformer {
	/**
	 *Creates an instance of HistoricalVolumeTransformer.
	 * @param {Contracts.KeyValuePair} data
	 * @memberof HistoricalVolumeTransformer
	 */
	public constructor(private readonly data: Contracts.KeyValuePair) {}

	/**
	 *
	 *
	 * @param {Contracts.KeyValuePair} options
	 * @returns {Contracts.HistoricalData}
	 * @memberof HistoricalVolumeTransformer
	 */
	public transform(options: Contracts.KeyValuePair): Contracts.HistoricalData {
		const datasets = this.data.map((value) => value.volumeto);

		return {
			labels: this.data.map((value) => DateTime.make(value.time * 1000).format(options.dateFormat)),
			datasets,
			min: Math.min(...datasets),
			max: Math.max(...datasets),
		};
	}
}
