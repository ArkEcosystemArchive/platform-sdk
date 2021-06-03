import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";
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
import { MarketTransformer } from "./transformers/market-transformer";

/**
 * Implements a price tracker through the CoinCap API.
 *
 * @see https://docs.coincap.io/
 *
 * @export
 * @class PriceTracker
 * @implements {PriceTracker}
 */
export class CoinCap implements PriceTracker {
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
	 * @type {HttpClient}
	 * @memberof PriceTracker
	 */
	readonly #httpClient: HttpClient;

	/**
	 * The host of the CoinCap API.
	 *
	 * @type {string}
	 * @memberof PriceTracker
	 */
	readonly #host: string = "https://api.coincap.io/v2";

	/**
	 * Creates an instance of PriceTracker.
	 *
	 * @param {HttpClient} httpClient
	 * @memberof PriceTracker
	 */
	public constructor(httpClient: HttpClient) {
		this.#httpClient = httpClient;
	}

	/** {@inheritDoc PriceTracker.verifyToken} */
	public async verifyToken(token: string): Promise<boolean> {
		try {
			const tokenData = await this.#fetchTokenData(token);

			return !!tokenData.id;
		} catch {
			return false;
		}
	}

	/** {@inheritDoc PriceTracker.marketData} */
	public async marketData(token: string): Promise<MarketDataCollection> {
		const tokenId = await this.#getTokenId(token);

		if (!tokenId) {
			throw new Error("Failed to determine the token.");
		}

		const response = await this.#getCurrencyData(token);

		return new MarketTransformer(response).transform({ token: tokenId });
	}

	/** {@inheritDoc PriceTracker.historicalPrice} */
	public async historicalPrice(options: HistoricalPriceOptions): Promise<HistoricalData> {
		const tokenId = await this.#getTokenId(options.token);

		const { rates } = await this.#getCurrencyData(options.token);
		const daysSubtract = options.days === 24 ? 1 : options.days;
		const timeInterval = options.days === 24 ? "h1" : "h12";
		const startDate = DateTime.make().subDays(daysSubtract).valueOf();
		const endDate = DateTime.make().valueOf();
		const body = await this.#get(`assets/${tokenId}/history`, {
			interval: timeInterval,
			start: startDate,
			end: endDate,
		});

		return new HistoricalPriceTransformer(body.data).transform({
			token: tokenId,
			currency: options.currency,
			rates,
			dateFormat: options.dateFormat,
		});
	}

	/** {@inheritDoc PriceTracker.historicalVolume} */
	public async historicalVolume(options: HistoricalVolumeOptions): Promise<HistoricalData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.historicalVolume.name);
	}

	/** {@inheritDoc PriceTracker.dailyAverage} */
	public async dailyAverage(options: DailyAverageOptions): Promise<number> {
		const tokenId = await this.#getTokenId(options.token);

		const start = DateTime.make(options.timestamp).startOf("day").valueOf();
		const end = DateTime.make(start).addDay().valueOf();

		const response = await this.#get(`assets/${tokenId}/history`, {
			interval: "h1",
			start,
			end,
		});

		if (!response.data.length) {
			return 0;
		}

		const priceUsd = response.data.reduce((acc, data) => acc + Number(data.priceUsd), 0) / response.data.length;

		const { data } = await this.#get("rates");

		return priceUsd * Number(data.find((rate: any) => rate.symbol === options.currency.toUpperCase()).rateUsd);
	}

	/**
	 * Returns and/or caches the remote token identifier.
	 *
	 * @private
	 * @param {string} token
	 * @param {number} [limit=1000]
	 * @returns {Promise<string>}
	 * @memberof PriceTracker
	 */
	async #getTokenId(token: string, limit = 1000): Promise<string> {
		if (Object.keys(this.tokenLookup).length > 0) {
			return this.tokenLookup[token.toUpperCase()];
		}

		const body = await this.#get("assets", { limit });

		for (const value of Object.values(body.data)) {
			// @ts-ignore
			this.tokenLookup[value.symbol.toUpperCase()] = value.id;
		}

		return this.tokenLookup[token.toUpperCase()];
	}

	/**
	 * Returns information about the given token.
	 *
	 * @private
	 * @param {string} token
	 * @returns {Promise<Contracts.KeyValuePair>}
	 * @memberof PriceTracker
	 */
	async #fetchTokenData(token: string): Promise<Contracts.KeyValuePair> {
		const tokenId = await this.#getTokenId(token);

		const body = await this.#get(`assets/${tokenId}`);

		return body.data;
	}

	/**
	 * Returns information about the available rates for the given token.
	 *
	 * @private
	 * @param {string} token
	 * @returns {Promise<Contracts.KeyValuePair>}
	 * @memberof PriceTracker
	 */
	async #getCurrencyData(token: string): Promise<Contracts.KeyValuePair> {
		const body = await this.#get("rates");
		const { data, timestamp } = body;
		const tokenData = await this.#fetchTokenData(token);

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

	/**
	 * Sends an HTTP GET request to the CoinCap API.
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
