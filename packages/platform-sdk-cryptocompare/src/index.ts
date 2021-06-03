import { Contracts, Data } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";

import { HistoricalPriceTransformer } from "./transformers/historical-price-transformer";
import { HistoricalVolumeTransformer } from "./transformers/historical-volume-transformer";
import { MarketTransformer } from "./transformers/market-transformer";

/**
 * Implements a price tracker through the CryptoCompare API.
 *
 * @see https://min-api.cryptocompare.com/
 *
 * @export
 * @class PriceTracker
 * @implements {Contracts.PriceTracker}
 */
export class PriceTracker implements Contracts.PriceTracker {
	/**
	 * The HTTP client instance.
	 *
	 * @type {Contracts.HttpClient}
	 * @memberof PriceTracker
	 */
	readonly #httpClient: Contracts.HttpClient;

	/**
	 * The host of the CryptoCompare API.
	 *
	 * @type {string}
	 * @memberof PriceTracker
	 */
	readonly #host: string = "https://min-api.cryptocompare.com";

	/**
	 * Creates an instance of PriceTracker.
	 *
	 * @param {Contracts.HttpClient} httpClient
	 * @memberof PriceTracker
	 */
	public constructor(httpClient: Contracts.HttpClient) {
		this.#httpClient = httpClient;
	}

	/** {@inheritDoc Contracts.PriceTracker.verifyToken} */
	public async verifyToken(token: string): Promise<boolean> {
		try {
			const body = await this.#get("data/price", {
				fsym: token,
				tsyms: "BTC",
			});

			return !!body.BTC;
		} catch {
			return false;
		}
	}

	/** {@inheritDoc Contracts.PriceTracker.marketData} */
	public async marketData(token: string): Promise<Contracts.MarketDataCollection> {
		const body = await this.#get("data/pricemultifull", {
			fsyms: token,
			tsyms: Object.keys(Data.CURRENCIES).join(","),
		});

		return new MarketTransformer(body.RAW && body.RAW[token] ? body.RAW[token] : {}).transform({});
	}

	/** {@inheritDoc Contracts.PriceTracker.historicalPrice} */
	public async historicalPrice(options: Contracts.HistoricalPriceOptions): Promise<Contracts.HistoricalData> {
		const body = await this.#get(`data/histo${options.type}`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: Math.round(new Date().getTime() / 1000),
			limit: options.days,
		});

		return new HistoricalPriceTransformer(body.Data).transform(options);
	}

	/** {@inheritDoc Contracts.PriceTracker.historicalVolume} */
	public async historicalVolume(options: Contracts.HistoricalVolumeOptions): Promise<Contracts.HistoricalData> {
		const body = await this.#get(`data/histo${options.type}`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: Math.round(new Date().getTime() / 1000),
			limit: options.days,
		});

		return new HistoricalVolumeTransformer(body.Data).transform(options);
	}

	/** {@inheritDoc Contracts.PriceTracker.dailyAverage} */
	public async dailyAverage(options: Contracts.DailyAverageOptions): Promise<number> {
		const response = await this.#get(`data/dayAvg`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: DateTime.make(options.timestamp).toUNIX(),
		});

		return response[options.currency.toUpperCase()];
	}

	/**
	 * Sends an HTTP GET request to the CryptoCompare API.
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
