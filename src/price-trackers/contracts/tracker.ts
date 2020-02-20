import { HistoricalOptions } from "./historical";

export interface PriceTracker {
	verifyToken(token: string): Promise<boolean>;

	getMarketData(token: string): Promise<object>;

	getHistoricalData(options: HistoricalOptions): Promise<object>;
}
