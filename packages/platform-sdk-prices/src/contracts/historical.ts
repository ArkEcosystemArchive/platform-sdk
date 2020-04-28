import { Contracts } from "@arkecosystem/platform-sdk";

export interface HistoricalData {
	labels: string[];
	datasets: number[];
	min: number;
	max: number;
}

export interface HistoricalTransformer {
	transform(data: Contracts.KeyValuePair, options: Contracts.KeyValuePair): HistoricalData;
}

export interface HistoricalPriceOptions {
	token: string;
	currency: string;
	days: number;
	type: string;
	dateFormat: string;
}

export interface HistoricalVolumeOptions {
	token: string;
	currency: string;
	days: number;
	type: string;
	dateFormat: string;
}

export interface DailyAverageOptions {
	token: string;
	currency: string;
	timestamp: number;
}
