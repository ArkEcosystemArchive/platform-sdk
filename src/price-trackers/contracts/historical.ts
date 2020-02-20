import { KeyValuePair } from "../../types";

export interface HistoricalData {
	labels: string[];
	datasets: number[];
	min: number;
	max: number;
}

export interface HistoricalTransformer {
	transform(data: KeyValuePair, options: KeyValuePair): HistoricalData;
}

export interface HistoricalOptions {
	token: string;
	currency: string;
	days: number;
	type: string;
	dateFormat: string;
}
