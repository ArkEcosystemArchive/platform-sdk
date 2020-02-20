import { PriceTracker as Adapter } from "./contracts";
import { HistoricalData, HistoricalOptions } from "./contracts/historical";
import { MarketDataCollection } from "./contracts/market";
import { PriceTrackerFactory } from "./factory";

export class PriceTrackerService {
	public constructor(private readonly adapter: Adapter) {}

	public static make(name: string): PriceTrackerService {
		return new PriceTrackerService(PriceTrackerFactory.make(name));
	}

	public async verifyToken(token: string): Promise<boolean> {
		return this.adapter.verifyToken(token);
	}

	public async fetchMarketData(token: string): Promise<MarketDataCollection> {
		return this.adapter.fetchMarketData(token);
	}

	public async fetchHistoricalData(options: HistoricalOptions): Promise<HistoricalData> {
		return this.adapter.fetchHistoricalData(options);
	}

	public async historicByDay(token: string, currency: string): Promise<HistoricalData> {
		return this.fetchHistoricalData({ token, currency, days: 24, type: "hour", dateFormat: "HH:mm" });
	}

	public async historicByWeek(token: string, currency: string): Promise<HistoricalData> {
		return this.fetchHistoricalData({ token, currency, days: 7, type: "day", dateFormat: "ddd" });
	}

	public async historicByMonth(token: string, currency: string): Promise<HistoricalData> {
		return this.fetchHistoricalData({ token, currency, days: 30, type: "day", dateFormat: "DD" });
	}

	public async historicByQuarter(token: string, currency: string): Promise<HistoricalData> {
		return this.fetchHistoricalData({ token, currency, days: 120, type: "day", dateFormat: "DD.MM" });
	}

	public async historicByYear(token: string, currency: string): Promise<HistoricalData> {
		return this.fetchHistoricalData({ token, currency, days: 365, type: "day", dateFormat: "DD.MM" });
	}
}
