import { Contracts } from "@arkecosystem/platform-sdk";
import { PriceTracker as CoinCap } from "@arkecosystem/platform-sdk-coincap";
import { PriceTracker as CoinGecko } from "@arkecosystem/platform-sdk-coingecko";
import { PriceTracker as CryptoCompare } from "@arkecosystem/platform-sdk-cryptocompare";

/**
 * Normalises the communication with Market Data Providers.
 *
 * @export
 * @class MarketService
 */
export class MarketService {
	/**
	 * The adapter that is used to retrieve data.
	 *
	 * @type {Contracts.PriceTracker}
	 * @memberof MarketService
	 */
	#adapter: Contracts.PriceTracker;

	/**
	 * Creates an instance of MarketService.
	 *
	 * @param {Contracts.PriceTracker} adapter
	 * @memberof MarketService
	 */
	public constructor(adapter: Contracts.PriceTracker) {
		this.#adapter = adapter;
	}

	/**
	 * Creates an instance of MarketService.
	 *
	 * @static
	 * @param {string} name
	 * @param {Contracts.HttpClient} httpClient
	 * @returns {MarketService}
	 * @memberof MarketService
	 */
	public static make(name: string, httpClient: Contracts.HttpClient): MarketService {
		return new MarketService(
			{
				coincap: new CoinCap(httpClient),
				coingecko: new CoinGecko(httpClient),
				cryptocompare: new CryptoCompare(httpClient),
			}[name.toLowerCase()]!,
		);
	}

	/**
	 * Set the adapter that is used to retrieve data.
	 *
	 * @param {Contracts.PriceTracker} adapter
	 * @memberof MarketService
	 */
	public setAdapter(adapter: Contracts.PriceTracker): void {
		this.#adapter = adapter;
	}

	/**
	 *
	 *
	 * @param {string} token
	 * @returns {Promise<boolean>}
	 * @memberof MarketService
	 */
	public async verifyToken(token: string): Promise<boolean> {
		return this.#adapter.verifyToken(token);
	}

	/**
	 *
	 *
	 * @param {string} token
	 * @returns {Promise<Contracts.MarketDataCollection>}
	 * @memberof MarketService
	 */
	public async marketData(token: string): Promise<Contracts.MarketDataCollection> {
		return this.#adapter.marketData(token);
	}

	/**
	 *
	 *
	 * @param {Contracts.HistoricalPriceOptions} options
	 * @returns {Promise<Contracts.HistoricalData>}
	 * @memberof MarketService
	 */
	public async historicalPrice(options: Contracts.HistoricalPriceOptions): Promise<Contracts.HistoricalData> {
		return this.#adapter.historicalPrice(options);
	}

	/**
	 *
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<Contracts.HistoricalData>}
	 * @memberof MarketService
	 */
	public async historicalPriceForDay(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalPrice({ token, currency, days: 24, type: "hour", dateFormat: "HH:mm" });
	}

	/**
	 *
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<Contracts.HistoricalData>}
	 * @memberof MarketService
	 */
	public async historicalPriceForWeek(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalPrice({ token, currency, days: 7, type: "day", dateFormat: "ddd" });
	}

	/**
	 *
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<Contracts.HistoricalData>}
	 * @memberof MarketService
	 */
	public async historicalPriceForMonth(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalPrice({ token, currency, days: 30, type: "day", dateFormat: "DD" });
	}

	/**
	 *
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<Contracts.HistoricalData>}
	 * @memberof MarketService
	 */
	public async historicalPriceForQuarter(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalPrice({ token, currency, days: 120, type: "day", dateFormat: "DD.MM" });
	}

	/**
	 *
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<Contracts.HistoricalData>}
	 * @memberof MarketService
	 */
	public async historicalPriceForYear(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalPrice({ token, currency, days: 365, type: "day", dateFormat: "DD.MM" });
	}

	/**
	 *
	 *
	 * @param {Contracts.HistoricalVolumeOptions} options
	 * @returns {Promise<Contracts.HistoricalData>}
	 * @memberof MarketService
	 */
	public async historicalVolume(options: Contracts.HistoricalVolumeOptions): Promise<Contracts.HistoricalData> {
		return this.#adapter.historicalVolume(options);
	}

	/**
	 *
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<Contracts.HistoricalData>}
	 * @memberof MarketService
	 */
	public async historicalVolumeForDay(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalVolume({ token, currency, days: 24, type: "hour", dateFormat: "HH:mm" });
	}

	/**
	 *
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<Contracts.HistoricalData>}
	 * @memberof MarketService
	 */
	public async historicalVolumeForWeek(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalVolume({ token, currency, days: 7, type: "day", dateFormat: "ddd" });
	}

	/**
	 *
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<Contracts.HistoricalData>}
	 * @memberof MarketService
	 */
	public async historicalVolumeForMonth(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalVolume({ token, currency, days: 30, type: "day", dateFormat: "DD" });
	}

	/**
	 *
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<Contracts.HistoricalData>}
	 * @memberof MarketService
	 */
	public async historicalVolumeForQuarter(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalVolume({ token, currency, days: 120, type: "day", dateFormat: "DD.MM" });
	}

	/**
	 *
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<Contracts.HistoricalData>}
	 * @memberof MarketService
	 */
	public async historicalVolumeForYear(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalVolume({ token, currency, days: 365, type: "day", dateFormat: "DD.MM" });
	}

	/**
	 *
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @param {number} timestamp
	 * @returns {Promise<number>}
	 * @memberof MarketService
	 */
	public async dailyAverage(token: string, currency: string, timestamp: number): Promise<number> {
		return this.#adapter.dailyAverage({ token, currency, timestamp });
	}
}
