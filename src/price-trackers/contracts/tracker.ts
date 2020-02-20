export interface PriceTracker {
	verifyToken(token: string): Promise<boolean>;

	getMarketData(token: string): Promise<object>;

	getHistoricalData(
		token: string,
		currency: string,
		days: number,
		opts: { limit: number; type: string; dateFormat: string },
	): Promise<object>;
}
