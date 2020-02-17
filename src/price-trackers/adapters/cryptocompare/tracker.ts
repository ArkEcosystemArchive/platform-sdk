import { NotImplemented } from "../../../exceptions";
import { HistoricalOptions, PriceTracker } from "../../contracts";

export class CryptoCompare implements PriceTracker {
	private readonly baseUrl: string = "...";

	public async verifyToken(token: string): Promise<boolean> {
		throw new NotImplemented(this.constructor.name, "verifyToken");
	}

	public async getMarketData(token: string): Promise<object> {
		throw new NotImplemented(this.constructor.name, "getMarketData");
	}

	public async getHistoricalData(
		token: string,
		currency: string,
		opts: HistoricalOptions = { type: "day", dateFormat: "DD.MM" },
	): Promise<object> {
		throw new NotImplemented(this.constructor.name, "getHistoricalData");
	}
}
