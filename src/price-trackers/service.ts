import { dayjs } from "../utils/dayjs";
import { HistoricalData, HistoricalPriceOptions, HistoricalVolumeOptions } from "./contracts/historical";
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

	public async getHistoricalPrice(options: HistoricalPriceOptions): Promise<HistoricalData> {
		return this.adapter.getHistoricalPrice(options);
	}

	public async getHistoricalPriceForDay(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalPrice({ token, currency, days: 24, type: "hour", dateFormat: "HH:mm" });
	}

	public async getHistoricalPriceForWeek(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalPrice({ token, currency, days: 7, type: "day", dateFormat: "ddd" });
	}

	public async getHistoricalPriceForMonth(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalPrice({ token, currency, days: 30, type: "day", dateFormat: "DD" });
	}

	public async getHistoricalPriceForQuarter(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalPrice({ token, currency, days: 120, type: "day", dateFormat: "DD.MM" });
	}

	public async getHistoricalPriceForYear(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalPrice({ token, currency, days: 365, type: "day", dateFormat: "DD.MM" });
	}

	public async getHistoricalVolume(options: HistoricalVolumeOptions): Promise<HistoricalData> {
		return this.adapter.getHistoricalVolume(options);
	}

	public async getHistoricalVolumeForDay(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalVolume({
			token,
			currency,
			from: dayjs()
				.subtract(365, "d")
				.unix(),
			to: dayjs().unix(),
			type: "hour",
			dateFormat: "HH:mm",
		});
	}

	public async getHistoricalVolumeForWeek(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalVolume({
			token,
			currency,
			from: dayjs()
				.subtract(365, "d")
				.unix(),
			to: dayjs().unix(),
			type: "day",
			dateFormat: "ddd",
		});
	}

	public async getHistoricalVolumeForMonth(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalVolume({
			token,
			currency,
			from: dayjs()
				.subtract(365, "d")
				.unix(),
			to: dayjs().unix(),
			type: "day",
			dateFormat: "DD",
		});
	}

	public async getHistoricalVolumeForQuarter(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalVolume({
			token,
			currency,
			from: dayjs()
				.subtract(365, "d")
				.unix(),
			to: dayjs().unix(),
			type: "day",
			dateFormat: "DD.MM",
		});
	}

	public async getHistoricalVolumeForYear(token: string, currency: string): Promise<HistoricalData> {
		return this.getHistoricalVolume({
			token,
			currency,
			from: dayjs()
				.subtract(365, "d")
				.unix(),
			to: dayjs().unix(),
			type: "day",
			dateFormat: "DD.MM",
		});
	}
}
