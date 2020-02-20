import { KeyValuePair } from "../../../../types";
import { dayjs } from "../../../../utils/dayjs";
import { HistoricalData, HistoricalTransformer } from "../../../contracts/historical";
import { convertToCurrency } from "../utils";

export class HistoricalVolumeTransformer implements HistoricalTransformer {
	public constructor(private readonly data: KeyValuePair) {}

	public transform(options: KeyValuePair): HistoricalData {
		const { token, currency, rates, dateFormat } = options;

		const tokenId = token.toUpperCase();
		const datasets = {};

		for (const value of Object.values(this.data)) {
			datasets[dayjs(value.date).format(dateFormat)] = convertToCurrency(value.priceUsd, {
				from: currency,
				to: tokenId,
				base: tokenId,
				rates,
			});
		}

		const datasetValues: number[] = Object.values(datasets);

		return {
			labels: Object.keys(datasets),
			datasets: datasetValues,
			min: Math.min(...datasetValues),
			max: Math.max(...datasetValues),
		};
	}
}
