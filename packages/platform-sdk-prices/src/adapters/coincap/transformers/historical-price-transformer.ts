import { Contracts, Utils } from "@arkecosystem/platform-sdk";

import { HistoricalData, HistoricalTransformer as TransformerContract } from "../../../contracts/historical";
import { convertToCurrency } from "../utils";

export class HistoricalPriceTransformer implements TransformerContract {
	public constructor(private readonly data: Contracts.KeyValuePair) {}

	public transform(options: Contracts.KeyValuePair): HistoricalData {
		const { token, currency, rates, dateFormat } = options;

		const tokenId = token.toUpperCase();
		const datasets = {};

		for (const value of Object.values(this.data) as any) {
			datasets[Utils.dayjs(value.date).format(dateFormat)] = convertToCurrency(value.priceUsd, {
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
