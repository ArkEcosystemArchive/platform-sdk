import { Contracts } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";

export class HistoricalVolumeTransformer implements Contracts.HistoricalTransformer {
	public constructor(private readonly data: Contracts.KeyValuePair) {}

	public transform(options: Contracts.KeyValuePair): Contracts.HistoricalData {
		const datasets = {};

		for (let i = 0; i < this.data.total_volumes.length; i += 24) {
			datasets[this.data.total_volumes[i][0]] = this.data.total_volumes[i][1];
		}

		const datasetValues: number[] = Object.values(datasets);

		return {
			labels: Object.keys(datasets).map((time) => DateTime.make(time).format(options.dateFormat)),
			datasets: datasetValues,
			min: Math.min(...datasetValues),
			max: Math.max(...datasetValues),
		};
	}
}
