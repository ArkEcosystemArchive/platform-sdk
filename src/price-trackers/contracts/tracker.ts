import { HistoricalData, HistoricalPriceOptions, HistoricalVolumeOptions } from "./historical";
import { MarketDataCollection } from "./market";

export interface PriceTracker {
	verifyToken(token: string): Promise<boolean>;

	getMarketData(token: string): Promise<MarketDataCollection>;

	getHistoricalPrice(options: HistoricalPriceOptions): Promise<HistoricalData>;

	getHistoricalVolume(options: HistoricalVolumeOptions): Promise<HistoricalData>;
}
