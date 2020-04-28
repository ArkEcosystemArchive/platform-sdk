import { Contracts, Utils } from "@arkecosystem/platform-sdk";

import { HistoricalData, HistoricalTransformer } from "../../../contracts/historical";

export class HistoricalVolumeTransformer implements HistoricalTransformer {
	public constructor(private readonly data: Contracts.KeyValuePair) {}

	public transform(options: Contracts.KeyValuePair): HistoricalData {
		const datasets = {};

		for (let i = 0; i < this.data.total_volumes.length; i += 24) {
			datasets[this.data.total_volumes[i][0]] = this.data.total_volumes[i][1];
		}

		const datasetValues: number[] = Object.values(datasets);

		return {
			labels: Object.keys(datasets).map((time) => Utils.dayjs(time).format(options.dateFormat)),
			datasets: datasetValues,
			min: Math.min(...datasetValues),
			max: Math.max(...datasetValues),
		};
	}
}
