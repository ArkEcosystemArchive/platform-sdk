import { Contracts } from "@arkecosystem/platform-sdk";
export interface MarketData {
	currency: number;
	price: number;
	marketCap: number;
	volume: number;
	date: Date;
	change24h: number;
}
export declare type MarketDataCollection = Record<string, MarketData>;
export interface MarketTransformer {
	transform(options: Contracts.KeyValuePair): MarketDataCollection;
}
