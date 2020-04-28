import { Contracts, Utils } from "@arkecosystem/platform-sdk";

import { HistoricalData, HistoricalTransformer } from "../../../contracts/historical";

export class HistoricalPriceTransformer implements HistoricalTransformer {
	public constructor(private readonly data: Contracts.KeyValuePair) {}

	public transform(options: Contracts.KeyValuePair): HistoricalData {
		const datasets = this.data.map((value) => value.close);

		return {
			labels: this.data.map((value) => Utils.dayjs(value.time * 1000).format(options.dateFormat)),
			datasets,
			min: Math.min(...datasets),
			max: Math.max(...datasets),
		};
	}
}
