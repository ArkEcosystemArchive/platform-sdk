import { Contracts, Data } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import ky from "ky";

import { HistoricalPriceTransformer } from "./transformers/historical-price-transformer";
import { HistoricalVolumeTransformer } from "./transformers/historical-volume-transformer";
import { MarketTransformer } from "./transformers/market-transformer";

export class PriceTracker implements Contracts.PriceTracker {
	readonly #host: string = "https://min-api.cryptocompare.com";

	public async verifyToken(token: string): Promise<boolean> {
		try {
			const body = await this.get("data/price", {
				fsym: token,
				tsyms: "BTC",
			});

			return !!body.BTC;
		} catch {
			return false;
		}
	}

	public async marketData(token: string): Promise<Contracts.MarketDataCollection> {
		const body = await this.get("data/pricemultifull", {
			fsyms: token,
			tsyms: Object.keys(Data.CURRENCIES).join(","),
		});

		return new MarketTransformer(body.RAW && body.RAW[token] ? body.RAW[token] : {}).transform({});
	}

	public async historicalPrice(options: Contracts.HistoricalPriceOptions): Promise<Contracts.HistoricalData> {
		const body = await this.get(`data/histo${options.type}`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: Math.round(new Date().getTime() / 1000),
			limit: options.days,
		});

		return new HistoricalPriceTransformer(body.Data).transform(options);
	}

	public async historicalVolume(options: Contracts.HistoricalVolumeOptions): Promise<Contracts.HistoricalData> {
		const body = await this.get(`data/histo${options.type}`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: Math.round(new Date().getTime() / 1000),
			limit: options.days,
		});

		return new HistoricalVolumeTransformer(body.Data).transform(options);
	}

	public async dailyAverage(options: Contracts.DailyAverageOptions): Promise<number> {
		const response = await this.get(`data/dayAvg`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: DateTime.make(options.timestamp).toUNIX(),
		});

		return response[options.currency.toUpperCase()];
	}

	private async get(path: string, searchParams = {}): Promise<any> {
		return ky.get(`${this.#host}/${path}`, { searchParams }).json();
	}
}
