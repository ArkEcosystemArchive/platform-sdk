import { dayjs } from "../../../utils/dayjs";
import { getJSON } from "../../../utils/get-json";
import { CURRENCIES } from "../../config";
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

export class CryptoCompare implements PriceTracker {
	private readonly baseUrl: string = "https://min-api.cryptocompare.com";

	public async verifyToken(token: string): Promise<boolean> {
		try {
			const uri = `${this.baseUrl}/data/price`;
			const body = await getJSON(uri, {
				fsym: token,
				tsyms: "BTC",
			});

			return !!body.BTC;
		} catch {
			return false;
		}
	}

	public async getMarketData(token: string): Promise<MarketDataCollection> {
		const uri = `${this.baseUrl}/data/pricemultifull`;
		const body = await getJSON(uri, {
			fsyms: token,
			tsyms: Object.keys(CURRENCIES).join(","),
		});

		return new MarketTransformer(body.RAW && body.RAW[token] ? body.RAW[token] : {}).transform({});
	}

	public async getHistoricalPrice(options: HistoricalPriceOptions): Promise<HistoricalData> {
		const body = await getJSON(`${this.baseUrl}/data/histo${options.type}`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: Math.round(new Date().getTime() / 1000),
			limit: options.days,
		});

		return new HistoricalPriceTransformer(body.Data).transform(options);
	}

	public async getHistoricalVolume(options: HistoricalVolumeOptions): Promise<HistoricalData> {
		const body = await getJSON(`${this.baseUrl}/data/histo${options.type}`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: Math.round(new Date().getTime() / 1000),
			limit: options.days,
		});

		return new HistoricalVolumeTransformer(body.Data).transform(options);
	}

	public async dailyAverage(options: DailyAverageOptions): Promise<number> {
		const response = await getJSON(`${this.baseUrl}/data/dayAvg`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: dayjs(options.timestamp).unix(),
		});

		return response[options.currency.toUpperCase()];
	}
}
