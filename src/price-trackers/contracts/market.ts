import { KeyValuePair } from "../../types";

export interface MarketData {
	currency: number;
	price: number;
	marketCap: number;
	volume: number;
	date: Date;
	change24h: number;
}

export type MarketDataCollection = MarketDataCollection;

export interface MarketTransformer {
	transform(options: KeyValuePair): MarketDataCollection;
}
