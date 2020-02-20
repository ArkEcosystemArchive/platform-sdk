import { HistoricalData, HistoricalOptions } from "./historical";
import { MarketDataCollection } from "./market";

export interface PriceTracker {
	verifyToken(token: string): Promise<boolean>;

	getMarketData(token: string): Promise<MarketDataCollection>;

	getHistoricalData(options: HistoricalOptions): Promise<HistoricalData>;
}
