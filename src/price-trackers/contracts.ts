export interface PriceTracker {
	verifyToken(token: string): Promise<boolean>;

	getMarketData(token: string): Promise<object>;

	getHistoricalData(
		token: string,
		currency: string,
		opts: { limit: number; type: string; dateFormat: string },
	): Promise<object>;
}

export interface ResponseTransformer {
	transform(data: object): object;
}

export interface HistoricalOptions {
	limit?: number;
	type?: string;
	dateFormat?: string;
}
