import { HttpClient } from "@arkecosystem/platform-sdk-http";
import {
	DailyAverageOptions,
	HistoricalData,
	HistoricalPriceOptions,
	HistoricalVolumeOptions,
	MarketDataCollection,
	PriceTracker,
} from "../../contracts";
/**
 * Implements a price tracker through the CryptoCompare API.
 *
 * @see https://min-api.cryptocompare.com/
 *
 * @export
 * @class PriceTracker
 * @implements {PriceTracker}
 */
export declare class CryptoCompare implements PriceTracker {
	#private;
	/**
	 * Creates an instance of PriceTracker.
	 *
	 * @param {HttpClient} httpClient
	 * @memberof PriceTracker
	 */
	constructor(httpClient: HttpClient);
	/** {@inheritDoc PriceTracker.verifyToken} */
	verifyToken(token: string): Promise<boolean>;
	/** {@inheritDoc PriceTracker.marketData} */
	marketData(token: string): Promise<MarketDataCollection>;
	/** {@inheritDoc PriceTracker.historicalPrice} */
	historicalPrice(options: HistoricalPriceOptions): Promise<HistoricalData>;
	/** {@inheritDoc PriceTracker.historicalVolume} */
	historicalVolume(options: HistoricalVolumeOptions): Promise<HistoricalData>;
	/** {@inheritDoc PriceTracker.dailyAverage} */
	dailyAverage(options: DailyAverageOptions): Promise<number>;
}
