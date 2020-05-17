import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class PriceTracker implements Contracts.PriceTracker {
	public async verifyToken(token: string): Promise<boolean> {
		return false;
	}

	public async marketData(token: string): Promise<Contracts.MarketDataCollection> {
		return {} as Contracts.MarketDataCollection;
	}

	public async historicalPrice(options: Contracts.HistoricalPriceOptions): Promise<Contracts.HistoricalData> {
		return {} as Contracts.HistoricalData;
	}

	public async historicalVolume(options: Contracts.HistoricalVolumeOptions): Promise<Contracts.HistoricalData> {
		return {} as Contracts.HistoricalData;
	}

	public async dailyAverage(options: Contracts.DailyAverageOptions): Promise<number> {
		return 0;
	}
}
