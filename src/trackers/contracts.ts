export interface Tracker {
	verifyToken(token: string): Promise<boolean>;

	getMarketData(token: string): Promise<object>;

	// To further improve this we introduce a parameter object instead
	// of adding dozens of arguments with default values. Anything above
	// 3 arguments is generally a code smell and is better off being refactored.
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
