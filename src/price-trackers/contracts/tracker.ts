import { HistoricalData, HistoricalOptions } from "./historical";
import { MarketDataCollection } from "./market";

export interface PriceTracker {
	verifyToken(token: string): Promise<boolean>;

	getMarketData(token: string): Promise<MarketDataCollection>;

	getHistoricalPrice(options: HistoricalOptions): Promise<HistoricalData>;

	getHistoricalVolume(options: HistoricalOptions): Promise<HistoricalData>;
}
