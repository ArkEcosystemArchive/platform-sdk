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

	public async fetchHistoricalData(
		token: string,
		currency: string,
		days: number,
		opts: HistoricalOptions = { type: "day", dateFormat: "DD.MM" },
	): Promise<HistoricalData> {
		return this.adapter.fetchHistoricalData(token, currency, days, opts);
	}

	public async historicByDay(token: string, currency: string): Promise<HistoricalData> {
		return this.fetchHistoricalData(token, currency, 24, { type: "hour", dateFormat: "HH:mm" });
	}

	public async historicByWeek(token: string, currency: string): Promise<HistoricalData> {
		return this.fetchHistoricalData(token, currency, 7, { type: "day", dateFormat: "ddd" });
	}

	public async historicByMonth(token: string, currency: string): Promise<HistoricalData> {
		return this.fetchHistoricalData(token, currency, 30, { type: "day", dateFormat: "DD" });
	}

	public async historicByQuarter(token: string, currency: string): Promise<HistoricalData> {
		return this.fetchHistoricalData(token, currency, 120);
	}

	public async historicByYear(token: string, currency: string): Promise<HistoricalData> {
		return this.fetchHistoricalData(token, currency, 365);
	}
}
