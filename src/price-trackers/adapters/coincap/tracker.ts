import { KeyValuePair } from "../../../types";
import { dayjs } from "../../../utils/dayjs";
import { getJSON } from "../../../utils/get-json";
import { HistoricalData, HistoricalOptions } from "../../contracts/historical";
import { MarketDataCollection } from "../../contracts/market";
import { PriceTracker } from "../../contracts/tracker";
import { HistoricalTransformer } from "./historical-transformer";
import { MarketTransformer } from "./market-transformer";

export class CoinCap implements PriceTracker {
	private readonly baseUrl: string = "https://api.coincap.io/v2";

	private readonly tokenLookup: KeyValuePair = {};

	public async verifyToken(token: string): Promise<boolean> {
		try {
			const tokenData = await this.fetchTokenData(token);

			return !!tokenData.id;
		} catch {
			return false;
		}
	}

	public async getMarketData(token: string): Promise<MarketDataCollection> {
		const tokenId = await this.getTokenId(token);

		if (!tokenId) {
			throw new Error("Failed to determine the token.");
		}

		const response = await this.getCurrencyData(token);

		return new MarketTransformer(response).transform({ token: tokenId });
	}

	public async getHistoricalData(
		token: string,
		currency: string,
		days: number,
		opts: HistoricalOptions = { type: "day", dateFormat: "DD.MM" },
	): Promise<HistoricalData> {
		const tokenId = await this.getTokenId(token);

		const { rates } = await this.getCurrencyData(token);
		const daysSubtract = days === 24 ? 1 : days;
		const timeInterval = days === 24 ? "h1" : "h12";
		const startDate = dayjs()
			.subtract(daysSubtract, "d")
			.valueOf();
		const endDate = dayjs().valueOf();
		const body = await getJSON(
			`${this.baseUrl}/assets/${tokenId}/history?interval=${timeInterval}&start=${startDate}&end=${endDate}`,
		);

		return new HistoricalTransformer(body.data).transform({
			token: tokenId,
			currency,
			rates,
			dateFormat: opts.dateFormat,
		});
	}

	private async getTokenId(token, limit = 1000): Promise<string> {
		if (Object.keys(this.tokenLookup).length > 0) {
			return this.tokenLookup[token.toUpperCase()];
		}

		const body = await getJSON(`${this.baseUrl}/assets?limit=${limit}`);

		for (const value of Object.values(body.data)) {
			// @ts-ignore
			this.tokenLookup[value.symbol.toUpperCase()] = value.id;
		}

		return this.tokenLookup[token.toUpperCase()];
	}

	private async fetchTokenData(token: string): Promise<KeyValuePair> {
		const tokenId = await this.getTokenId(token);

		const body = await getJSON(`${this.baseUrl}/assets/${tokenId}`);

		return body.data;
	}

	private async getCurrencyData(token: string): Promise<KeyValuePair> {
		const body = await getJSON(`${this.baseUrl}/rates`);
		const { data, timestamp } = body;
		const tokenData = await this.fetchTokenData(token);

		const response = {
			assets: { [tokenData.symbol.toUpperCase()]: tokenData },
			rates: { [tokenData.symbol.toUpperCase()]: tokenData.priceUsd },
			timestamp,
		};

		for (const value of data) {
			response.assets[value.symbol.toUpperCase()] = value;
			response.rates[value.symbol.toUpperCase()] = value.rateUsd;
		}

		return response;
	}
}
