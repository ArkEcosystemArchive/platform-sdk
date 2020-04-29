import { Contracts, Utils } from "@arkecosystem/platform-sdk";

export class HistoricalVolumeTransformer implements Contracts.HistoricalTransformer {
	public constructor(private readonly data: Contracts.KeyValuePair) {}

	public transform(options: Contracts.KeyValuePair): Contracts.HistoricalData {
		const datasets = this.data.map((value) => value.volumeto);

		return {
			labels: this.data.map((value) => Utils.dayjs(value.time * 1000).format(options.dateFormat)),
			datasets,
			min: Math.min(...datasets),
			max: Math.max(...datasets),
		};
	}
}
