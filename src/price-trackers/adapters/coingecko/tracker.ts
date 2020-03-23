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
import { HistoricalVolumeTransformer } from "./transformers/historical-volume-transformer";
import { MarketTransformer } from "./transformers/market-transformer";

export class CoinGecko implements PriceTracker {
	private readonly baseUrl: string = "https://api.coingecko.com/api/v3";

	private readonly tokenLookup: KeyValuePair = {};

	public async verifyToken(token: string): Promise<boolean> {
		const tokenId = await this.getTokenId(token);

		try {
			const body = await getJSON(`${this.baseUrl}/simple/price`, {
				ids: tokenId,
				vs_currencies: "BTC",
			});

			return !!body[tokenId];
		} catch {
			return false;
		}
	}

	public async marketData(token: string): Promise<MarketDataCollection> {
		const tokenId = await this.getTokenId(token);

		const body = await getJSON(`${this.baseUrl}/coins/${tokenId}`);

		return new MarketTransformer(body.market_data).transform({});
	}

	public async historicalPrice(options: HistoricalPriceOptions): Promise<HistoricalData> {
		const tokenId = await this.getTokenId(options.token);

		const body = await getJSON(`${this.baseUrl}/coins/${tokenId}/market_chart`, {
			vs_currency: options.currency,
			days: options.days,
		});

		return new HistoricalPriceTransformer(body).transform(options);
	}

	public async historicalVolume(options: HistoricalVolumeOptions): Promise<HistoricalData> {
		const tokenId = await this.getTokenId(options.token);

		const body = await getJSON(`${this.baseUrl}/coins/${tokenId}/market_chart/range`, {
			id: options.token,
			vs_currency: options.currency,
			from: dayjs().subtract(options.days, "d").unix(),
			to: dayjs().unix(),
		});

		return new HistoricalVolumeTransformer(body).transform(options);
	}

	public async dailyAverage(options: DailyAverageOptions): Promise<number> {
		throw new NotImplemented(this.constructor.name, "dailyAverage");
	}

	private async getTokenId(token): Promise<string> {
		if (Object.keys(this.tokenLookup).length > 0) {
			return this.tokenLookup[token.toUpperCase()];
		}

		const uri = `${this.baseUrl}/coins/list`;
		const body = await getJSON(uri);

		for (const value of Object.values(body)) {
			// @ts-ignore
			this.tokenLookup[value.symbol.toUpperCase()] = value.id;
		}

		return this.tokenLookup[token.toUpperCase()];
	}
}
