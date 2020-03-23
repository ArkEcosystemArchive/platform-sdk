import { NotImplemented } from "../../../exceptions";
import { KeyValuePair } from "../../../types";
import { dayjs } from "../../../utils/dayjs";
import { getJSON } from "../../../utils/get-json";
import {
	DailyAverageOptions,
	HistoricalData,
	HistoricalPriceOptions,
	HistoricalVolumeOptions,
} from "../../contracts/historical";
import { MarketDataCollection } from "../../contracts/market";
import { PriceTracker } from "../../contracts/tracker";
import { HistoricalPriceTransformer } from "./transformers/historical-price-transformer";
import { MarketTransformer } from "./transformers/market-transformer";

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

	public async marketData(token: string): Promise<MarketDataCollection> {
		const tokenId = await this.getTokenId(token);

		if (!tokenId) {
			throw new Error("Failed to determine the token.");
		}

		const response = await this.getCurrencyData(token);

		return new MarketTransformer(response).transform({ token: tokenId });
	}

	public async historicalPrice(options: HistoricalPriceOptions): Promise<HistoricalData> {
		const tokenId = await this.getTokenId(options.token);

		const { rates } = await this.getCurrencyData(options.token);
		const daysSubtract = options.days === 24 ? 1 : options.days;
		const timeInterval = options.days === 24 ? "h1" : "h12";
		const startDate = dayjs().subtract(daysSubtract, "d").valueOf();
		const endDate = dayjs().valueOf();
		const body = await getJSON(
			`${this.baseUrl}/assets/${tokenId}/history?interval=${timeInterval}&start=${startDate}&end=${endDate}`,
		);

		return new HistoricalPriceTransformer(body.data).transform({
			token: tokenId,
			currency: options.currency,
			rates,
			dateFormat: options.dateFormat,
		});
	}

	public async historicalVolume(options: HistoricalVolumeOptions): Promise<HistoricalData> {
		throw new NotImplemented(this.constructor.name, "historicalVolume");
	}

	public async dailyAverage(options: DailyAverageOptions): Promise<number> {
		throw new NotImplemented(this.constructor.name, "dailyAverage");
	}

	private async getTokenId(token: string, limit = 1000): Promise<string> {
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
