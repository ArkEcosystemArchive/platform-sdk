import { Contracts } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";

/**
 *
 *
 * @export
 * @class HistoricalPriceTransformer
 * @implements {Contracts.HistoricalTransformer}
 */
export class HistoricalPriceTransformer implements Contracts.HistoricalTransformer {
	/**
	 *Creates an instance of HistoricalPriceTransformer.
	 * @param {Contracts.KeyValuePair} data
	 * @memberof HistoricalPriceTransformer
	 */
	public constructor(private readonly data: Contracts.KeyValuePair) {}

	public transform(options: Contracts.KeyValuePair): Contracts.HistoricalData {
		const /**
		 *
		 *
		 * @param {*} value
		 */
		datasets = this.data.map((value) => value.close);

		return {
			labels: this.data.map((value) => DateTime.make(value.time * 1000).format(options.dateFormat)),
			datasets,
			min: Math.min(...datasets),
			max: Math.max(...datasets),
		};
	}
}
