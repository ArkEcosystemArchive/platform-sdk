import { Contracts, Data, Utils } from "@arkecosystem/platform-sdk";

import { HistoricalPriceTransformer } from "./transformers/historical-price-transformer";
import { HistoricalVolumeTransformer } from "./transformers/historical-volume-transformer";
import { MarketTransformer } from "./transformers/market-transformer";

export class PriceTracker implements Contracts.PriceTracker {
	readonly #client: Utils.Http;

	public constructor() {
		this.#client = Utils.Http.new("https://min-api.cryptocompare.com");
	}

	public async verifyToken(token: string): Promise<boolean> {
		try {
			const body = await this.#client.get("data/price", {
				fsym: token,
				tsyms: "BTC",
			});

			return !!body.BTC;
		} catch {
			return false;
		}
	}

	public async marketData(token: string): Promise<Contracts.MarketDataCollection> {
		const body = await this.#client.get("data/pricemultifull", {
			fsyms: token,
			tsyms: Object.keys(Data.CURRENCIES).join(","),
		});

		return new MarketTransformer(body.RAW && body.RAW[token] ? body.RAW[token] : {}).transform({});
	}

	public async historicalPrice(options: Contracts.HistoricalPriceOptions): Promise<Contracts.HistoricalData> {
		const body = await this.#client.get(`data/histo${options.type}`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: Math.round(new Date().getTime() / 1000),
			limit: options.days,
		});

		return new HistoricalPriceTransformer(body.Data).transform(options);
	}

	public async historicalVolume(options: Contracts.HistoricalVolumeOptions): Promise<Contracts.HistoricalData> {
		const body = await this.#client.get(`data/histo${options.type}`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: Math.round(new Date().getTime() / 1000),
			limit: options.days,
		});

		return new HistoricalVolumeTransformer(body.Data).transform(options);
	}

	public async dailyAverage(options: Contracts.DailyAverageOptions): Promise<number> {
		const response = await this.#client.get(`data/dayAvg`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: Utils.dayjs(options.timestamp).unix(),
		});

		return response[options.currency.toUpperCase()];
	}
}
