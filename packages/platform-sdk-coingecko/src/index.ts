import { Coins, Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";

import { HistoricalPriceTransformer } from "./transformers/historical-price-transformer";
import { HistoricalVolumeTransformer } from "./transformers/historical-volume-transformer";
import { MarketTransformer } from "./transformers/market-transformer";

export class PriceTracker implements Contracts.PriceTracker {
	private readonly tokenLookup: Contracts.KeyValuePair = {};

	readonly #client: Utils.Http;

	public constructor() {
		this.#client = Utils.Http.new("https://api.coingecko.com/api/v3");
	}

	public async verifyToken(token: string): Promise<boolean> {
		const tokenId = await this.getTokenId(token);

		try {
			const body = await this.#client.get(`simple/price`, {
				ids: tokenId,
				vs_currencies: "BTC",
			});

			return !!body[tokenId];
		} catch {
			return false;
		}
	}

	public async marketData(token: string): Promise<Contracts.MarketDataCollection> {
		const tokenId = await this.getTokenId(token);

		const body = await this.#client.get(`coins/${tokenId}`);

		return new MarketTransformer(body.market_data).transform({});
	}

	public async historicalPrice(options: Contracts.HistoricalPriceOptions): Promise<Contracts.HistoricalData> {
		const tokenId = await this.getTokenId(options.token);

		const body = await this.#client.get(`coins/${tokenId}/market_chart`, {
			vs_currency: options.currency,
			days: options.days,
		});

		return new HistoricalPriceTransformer(body).transform(options);
	}

	public async historicalVolume(options: Contracts.HistoricalVolumeOptions): Promise<Contracts.HistoricalData> {
		const tokenId = await this.getTokenId(options.token);

		const body = await this.#client.get(`coins/${tokenId}/market_chart/range`, {
			id: options.token,
			vs_currency: options.currency,
			from: Utils.dayjs().subtract(options.days, "d").unix(),
			to: Utils.dayjs().unix(),
		});

		return new HistoricalVolumeTransformer(body).transform(options);
	}

	public async dailyAverage(options: Contracts.DailyAverageOptions): Promise<number> {
		throw new Exceptions.NotImplemented(this.constructor.name, "dailyAverage");
	}

	private async getTokenId(token): Promise<string> {
		if (Object.keys(this.tokenLookup).length > 0) {
			return this.tokenLookup[token.toUpperCase()];
		}

		const uri = `coins/list`;
		const body = await this.#client.get(uri);

		for (const value of Object.values(body)) {
			// @ts-ignore
			this.tokenLookup[value.symbol.toUpperCase()] = value.id;
		}

		return this.tokenLookup[token.toUpperCase()];
	}
}
