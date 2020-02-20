import { KeyValuePair } from "../../../../types";
import { dayjs } from "../../../../utils/dayjs";
import { HistoricalData, HistoricalTransformer } from "../../../contracts/historical";

export class HistoricalVolumeTransformer implements HistoricalTransformer {
	public constructor(private readonly data: KeyValuePair) {}

	public transform(options: KeyValuePair): HistoricalData {
		const datasets = {};
		for (let i = 0; i < this.data.prices.length; i += 24) {
			datasets[this.data.prices[i][0]] = this.data.prices[i][1];
		}

		const datasetValues: number[] = Object.values(datasets);

		return {
			labels: Object.keys(datasets).map(time => dayjs(time).format(options.dateFormat)),
			datasets: datasetValues,
			min: Math.min(...datasetValues),
			max: Math.max(...datasetValues),
		};
	}
}
