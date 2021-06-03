import { Contracts } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";

import {
	DailyAverageOptions,
	HistoricalData,
	HistoricalPriceOptions,
	HistoricalVolumeOptions,
	MarketDataCollection,
	PriceTracker,
} from "../../contracts";
import { HistoricalPriceTransformer } from "./transformers/historical-price-transformer";
import { HistoricalVolumeTransformer } from "./transformers/historical-volume-transformer";
import { MarketTransformer } from "./transformers/market-transformer";

/**
 * Implements a price tracker through the CoinGecko API.
 *
 * @see https://www.coingecko.com/en/api
 *
 * @export
 * @class PriceTracker
 * @implements {PriceTracker}
 */
export class CoinGecko implements PriceTracker {
	/**
	 * The cache that holds the remote token identifiers.
	 *
	 * @private
	 * @type {Contracts.KeyValuePair}
	 * @memberof PriceTracker
	 */
	private readonly tokenLookup: Contracts.KeyValuePair = {};

	/**
	 * The HTTP client instance.
	 *
	 * @type {Contracts.HttpClient}
	 * @memberof PriceTracker
	 */
	readonly #httpClient: Contracts.HttpClient;

	/**
	 * The host of the CoinGecko API.
	 *
	 * @type {string}
	 * @memberof PriceTracker
	 */
	readonly #host: string = "https://api.coingecko.com/api/v3";

	/**
	 * Creates an instance of PriceTracker.
	 *
	 * @param {Contracts.HttpClient} httpClient
	 * @memberof PriceTracker
	 */
	public constructor(httpClient: Contracts.HttpClient) {
		this.#httpClient = httpClient;
	}

	/** {@inheritDoc PriceTracker.verifyToken} */
	public async verifyToken(token: string): Promise<boolean> {
		const tokenId = await this.#getTokenId(token);

		try {
			const body = await this.#get(`simple/price`, {
				ids: tokenId,
				vs_currencies: "BTC",
			});

			return !!body[tokenId];
		} catch {
			return false;
		}
	}

	/** {@inheritDoc PriceTracker.marketData} */
	public async marketData(token: string): Promise<MarketDataCollection> {
		const tokenId = await this.#getTokenId(token);

		const body = await this.#get(`coins/${tokenId}`);

		return new MarketTransformer(body.market_data).transform({});
	}

	/** {@inheritDoc PriceTracker.historicalPrice} */
	public async historicalPrice(options: HistoricalPriceOptions): Promise<HistoricalData> {
		const tokenId = await this.#getTokenId(options.token);

		const body = await this.#get(`coins/${tokenId}/market_chart`, {
			vs_currency: options.currency,
			days: options.days,
		});

		return new HistoricalPriceTransformer(body).transform(options);
	}

	/** {@inheritDoc PriceTracker.historicalVolume} */
	public async historicalVolume(options: HistoricalVolumeOptions): Promise<HistoricalData> {
		const tokenId = await this.#getTokenId(options.token);

		const body = await this.#get(`coins/${tokenId}/market_chart/range`, {
			id: options.token,
			vs_currency: options.currency,
			from: DateTime.make().subDays(options.days).toUNIX(),
			to: DateTime.make().toUNIX(),
		});

		return new HistoricalVolumeTransformer(body).transform(options);
	}

	/** {@inheritDoc PriceTracker.dailyAverage} */
	public async dailyAverage(options: DailyAverageOptions): Promise<number> {
		const tokenId = await this.#getTokenId(options.token);

		const response = await this.#get(`coins/${tokenId}/history`, {
			date: DateTime.make(options.timestamp).format("DD-MM-YYYY"),
		});

		return response.market_data?.current_price[options.currency.toLowerCase()];
	}

	/**
	 * Returns and/or caches the remote token identifier.
	 *
	 * @private
	 * @param {*} token
	 * @returns {Promise<string>}
	 * @memberof PriceTracker
	 */
	async #getTokenId(token): Promise<string> {
		if (Object.keys(this.tokenLookup).length > 0) {
			return this.tokenLookup[token.toUpperCase()];
		}

		const uri = `coins/list`;
		const body = await this.#get(uri);

		for (const value of Object.values(body)) {
			// @ts-ignore
			this.tokenLookup[value.symbol.toUpperCase()] = value.id;
		}

		return this.tokenLookup[token.toUpperCase()];
	}

	/**
	 * Sends an HTTP GET request to the CoinGecko API.
	 *
	 * @private
	 * @param {string} path
	 * @param {*} [query={}]
	 * @returns {Promise<any>}
	 * @memberof PriceTracker
	 */
	async #get(path: string, query = {}): Promise<any> {
		const response = await this.#httpClient.get(`${this.#host}/${path}`, query);

		return response.json();
	}
}
