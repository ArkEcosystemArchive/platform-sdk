import { HttpClient } from "@arkecosystem/platform-sdk-http";
import {
	HistoricalData,
	HistoricalPriceOptions,
	HistoricalVolumeOptions,
	MarketDataCollection,
	PriceTracker,
} from "./contracts";
/**
 * Normalises the communication with Market Data Providers.
 *
 * @export
 * @class MarketService
 */
export declare class MarketService {
	#private;
	/**
	 * Creates an instance of MarketService.
	 *
	 * @param {PriceTracker} adapter
	 * @memberof MarketService
	 */
	constructor(adapter: PriceTracker);
	/**
	 * Creates an instance of MarketService.
	 *
	 * @static
	 * @param {string} name
	 * @param {HttpClient} httpClient
	 * @returns {MarketService}
	 * @memberof MarketService
	 */
	static make(name: string, httpClient: HttpClient): MarketService;
	/**
	 * Set the adapter that is used to retrieve data.
	 *
	 * @param {PriceTracker} adapter
	 * @memberof MarketService
	 */
	setAdapter(adapter: PriceTracker): void;
	/**
	 * Verify that the given token exists on the market data provider.
	 *
	 * @param {string} token
	 * @returns {Promise<boolean>}
	 * @memberof MarketService
	 */
	verifyToken(token: string): Promise<boolean>;
	/**
	 * Returns market data for the given token.
	 *
	 * @param {string} token
	 * @returns {Promise<MarketDataCollection>}
	 * @memberof MarketService
	 */
	marketData(token: string): Promise<MarketDataCollection>;
	/**
	 * Returns historical prices based on the given options.
	 *
	 * @param {HistoricalPriceOptions} options
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	historicalPrice(options: HistoricalPriceOptions): Promise<HistoricalData>;
	/**
	 * Returns historical prices with a daily interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	historicalPriceForDay(token: string, currency: string): Promise<HistoricalData>;
	/**
	 * Returns historical prices with a weekly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	historicalPriceForWeek(token: string, currency: string): Promise<HistoricalData>;
	/**
	 * Returns historical prices with a monthly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	historicalPriceForMonth(token: string, currency: string): Promise<HistoricalData>;
	/**
	 * Returns historical prices with a quarterly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	historicalPriceForQuarter(token: string, currency: string): Promise<HistoricalData>;
	/**
	 * Returns historical prices with a yearly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	historicalPriceForYear(token: string, currency: string): Promise<HistoricalData>;
	/**
	 * Returns historical volumes based on the given options.
	 *
	 * @param {HistoricalVolumeOptions} options
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	historicalVolume(options: HistoricalVolumeOptions): Promise<HistoricalData>;
	/**
	 * Returns historical volumes with a daily interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	historicalVolumeForDay(token: string, currency: string): Promise<HistoricalData>;
	/**
	 * Returns historical volumes with a weekly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	historicalVolumeForWeek(token: string, currency: string): Promise<HistoricalData>;
	/**
	 * Returns historical volumes with a monthly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	historicalVolumeForMonth(token: string, currency: string): Promise<HistoricalData>;
	/**
	 * Returns historical volumes with a quarterly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	historicalVolumeForQuarter(token: string, currency: string): Promise<HistoricalData>;
	/**
	 * Returns historical volumes with a yearly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	historicalVolumeForYear(token: string, currency: string): Promise<HistoricalData>;
	/**
	 * Returns the daily average price for the given token, currency and time.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @param {number} timestamp
	 * @returns {Promise<number>}
	 * @memberof MarketService
	 */
	dailyAverage(token: string, currency: string, timestamp: number): Promise<number>;
}
