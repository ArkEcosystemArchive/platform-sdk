import { HistoricalData, HistoricalOptions } from "./contracts/historical";
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

	public async getMarketData(token: string): Promise<MarketDataCollection> {
		return this.adapter.getMarketData(token);
	}

	public async getHistoricalData(options: HistoricalOptions): Promise<HistoricalData> {
		return this.adapter.getHistoricalData(options);
	}

	public async getHistoricalDataForDay(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalData({ token, currency, days: 24, type: "hour", dateFormat: "HH:mm" });
	}

	public async getHistoricalDataForWeek(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalData({ token, currency, days: 7, type: "day", dateFormat: "ddd" });
	}

	public async getHistoricalDataForMonth(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalData({ token, currency, days: 30, type: "day", dateFormat: "DD" });
	}

	public async getHistoricalDataForQuarter(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalData({ token, currency, days: 120, type: "day", dateFormat: "DD.MM" });
	}

	public async getHistoricalDataForYear(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalData({ token, currency, days: 365, type: "day", dateFormat: "DD.MM" });
	}
}
