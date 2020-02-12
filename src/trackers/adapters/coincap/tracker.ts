import { HistoricalOptions, Tracker } from "../../contracts";
import { HistoricalTransformer } from "./historical-transformer";
import { MarketTransformer } from "./market-transformer";

export class CoinCap implements Tracker {
	private readonly baseUrl: string = "...";

	public async verifyToken(token: string): Promise<boolean> {
		return true;
	}

	public async getMarketData(token: string): Promise<object> {
		return new MarketTransformer().transform({});
	}

	public async getHistoricalData(
		token: string,
		currency: string,
		opts: HistoricalOptions = { type: "day", dateFormat: "DD.MM" },
	): Promise<object> {
		return new HistoricalTransformer().transform({});
	}
}
