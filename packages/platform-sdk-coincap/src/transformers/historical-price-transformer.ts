import { Contracts } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";

import { convertToCurrency } from "../utils";

export class HistoricalPriceTransformer implements Contracts.HistoricalTransformer {
	public constructor(private readonly data: Contracts.KeyValuePair) {}

	public transform(options: Contracts.KeyValuePair): Contracts.HistoricalData {
		const { token, currency, rates, dateFormat } = options;

		const tokenId = token.toUpperCase();
		const datasets = {};

		for (const value of Object.values(this.data) as any) {
			datasets[DateTime.make(value.date).format(dateFormat)] = convertToCurrency(value.priceUsd, {
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
