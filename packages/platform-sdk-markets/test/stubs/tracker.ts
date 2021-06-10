import {
	DailyAverageOptions,
	HistoricalData,
	HistoricalPriceOptions,
	HistoricalVolumeOptions,
	MarketDataCollection,
} from "../../source/contracts";

export class PriceTracker implements PriceTracker {
	public async verifyToken(token: string): Promise<boolean> {
		return false;
	}

	public async marketData(token: string): Promise<MarketDataCollection> {
		return {} as MarketDataCollection;
	}

	public async historicalPrice(options: HistoricalPriceOptions): Promise<HistoricalData> {
		return {} as HistoricalData;
	}

	public async historicalVolume(options: HistoricalVolumeOptions): Promise<HistoricalData> {
		return {} as HistoricalData;
	}

	public async dailyAverage(options: DailyAverageOptions): Promise<number> {
		return 0;
	}
}
