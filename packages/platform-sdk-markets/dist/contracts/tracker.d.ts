import { DailyAverageOptions, HistoricalData, HistoricalPriceOptions, HistoricalVolumeOptions } from "./historical";
import { MarketDataCollection } from "./market";
export interface PriceTracker {
	verifyToken(token: string): Promise<boolean>;
	marketData(token: string): Promise<MarketDataCollection>;
	historicalPrice(options: HistoricalPriceOptions): Promise<HistoricalData>;
	historicalVolume(options: HistoricalVolumeOptions): Promise<HistoricalData>;
	dailyAverage(options: DailyAverageOptions): Promise<number>;
}
