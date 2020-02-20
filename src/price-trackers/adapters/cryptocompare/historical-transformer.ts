import { KeyValuePair } from "../../../types";
import { dayjs } from "../../../utils/dayjs";
import { HistoricalData, HistoricalTransformer as TransformerContract } from "../../contracts/historical";

export class HistoricalTransformer implements TransformerContract {
	public constructor(private readonly data: KeyValuePair) {}

	public transform(options: KeyValuePair): HistoricalData {
		const datasets = this.data.map(value => value.close);

		return {
			labels: this.data.map(value => dayjs(value.time * 1000).format(options.dateFormat)),
			datasets,
			min: Math.min(...datasets),
			max: Math.max(...datasets),
		};
	}
}
