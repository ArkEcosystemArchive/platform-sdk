import {
	DailyAverageOptions,
	HistoricalData,
	HistoricalPriceOptions,
	HistoricalVolumeOptions,
} from "./contracts/historical";
import { MarketDataCollection } from "./contracts/market";
import { PriceTracker } from "./contracts/tracker";
import { PriceTrackerFactory } from "./factory";

export class PriceTrackerService {
	public constructor(private readonly adapter: PriceTracker) {}

	public static make(name: string): PriceTrackerService {
		return new PriceTrackerService(PriceTrackerFactory.make(name));
	}

	public async verifyToken(token: string): Promise<boolean> {
		return this.adapter.verifyToken(token);
	}

	public async marketData(token: string): Promise<MarketDataCollection> {
		return this.adapter.marketData(token);
	}

	public async historicalPrice(options: HistoricalPriceOptions): Promise<HistoricalData> {
		return this.adapter.historicalPrice(options);
	}

	public async historicalPriceForDay(token: string, currency: string): Promise<HistoricalData> {
		return this.historicalPrice({ token, currency, days: 24, type: "hour", dateFormat: "HH:mm" });
	}

	public async historicalPriceForWeek(token: string, currency: string): Promise<HistoricalData> {
		return this.historicalPrice({ token, currency, days: 7, type: "day", dateFormat: "ddd" });
	}

	public async historicalPriceForMonth(token: string, currency: string): Promise<HistoricalData> {
		return this.historicalPrice({ token, currency, days: 30, type: "day", dateFormat: "DD" });
	}

	public async historicalPriceForQuarter(token: string, currency: string): Promise<HistoricalData> {
		return this.historicalPrice({ token, currency, days: 120, type: "day", dateFormat: "DD.MM" });
	}

	public async historicalPriceForYear(token: string, currency: string): Promise<HistoricalData> {
		return this.historicalPrice({ token, currency, days: 365, type: "day", dateFormat: "DD.MM" });
	}

	public async historicalVolume(options: HistoricalVolumeOptions): Promise<HistoricalData> {
		return this.adapter.historicalVolume(options);
	}

	public async historicalVolumeForDay(token: string, currency: string): Promise<HistoricalData> {
		return this.historicalVolume({ token, currency, days: 24, type: "hour", dateFormat: "HH:mm" });
	}

	public async historicalVolumeForWeek(token: string, currency: string): Promise<HistoricalData> {
		return this.historicalVolume({ token, currency, days: 7, type: "day", dateFormat: "ddd" });
	}

	public async historicalVolumeForMonth(token: string, currency: string): Promise<HistoricalData> {
		return this.historicalVolume({ token, currency, days: 30, type: "day", dateFormat: "DD" });
	}

	public async historicalVolumeForQuarter(token: string, currency: string): Promise<HistoricalData> {
		return this.historicalVolume({ token, currency, days: 120, type: "day", dateFormat: "DD.MM" });
	}

	public async historicalVolumeForYear(token: string, currency: string): Promise<HistoricalData> {
		return this.historicalVolume({ token, currency, days: 365, type: "day", dateFormat: "DD.MM" });
	}

	public async dailyAverage(token: string, currency: string, timestamp: number): Promise<number> {
		return this.adapter.dailyAverage({ token, currency, timestamp });
	}
}
