import { DailyAverageOptions, HistoricalData, HistoricalPriceOptions, HistoricalVolumeOptions } from "./historical";
import { MarketDataCollection } from "./market";

/**
 *
 *
 * @export
 * @interface PriceTracker
 */
export interface PriceTracker {
	/**
	 *
	 *
	 * @param {string} token
	 * @returns {Promise<boolean>}
	 * @memberof PriceTracker
	 */
	verifyToken(token: string): Promise<boolean>;

	/**
	 *
	 *
	 * @param {string} token
	 * @returns {Promise<MarketDataCollection>}
	 * @memberof PriceTracker
	 */
	marketData(token: string): Promise<MarketDataCollection>;

	/**
	 *
	 *
	 * @param {HistoricalPriceOptions} options
	 * @returns {Promise<HistoricalData>}
	 * @memberof PriceTracker
	 */
	historicalPrice(options: HistoricalPriceOptions): Promise<HistoricalData>;

	/**
	 *
	 *
	 * @param {HistoricalVolumeOptions} options
	 * @returns {Promise<HistoricalData>}
	 * @memberof PriceTracker
	 */
	historicalVolume(options: HistoricalVolumeOptions): Promise<HistoricalData>;

	/**
	 *
	 *
	 * @param {DailyAverageOptions} options
	 * @returns {Promise<number>}
	 * @memberof PriceTracker
	 */
	dailyAverage(options: DailyAverageOptions): Promise<number>;
}
