import { KeyValuePair } from "../types";

/**
 *
 *
 * @export
 * @interface HistoricalData
 */
export interface HistoricalData {
	/**
	 *
	 *
	 * @type {string[]}
	 * @memberof HistoricalData
	 */
	labels: string[];
	/**
	 *
	 *
	 * @type {number[]}
	 * @memberof HistoricalData
	 */
	datasets: number[];
	/**
	 *
	 *
	 * @type {number}
	 * @memberof HistoricalData
	 */
	min: number;
	/**
	 *
	 *
	 * @type {number}
	 * @memberof HistoricalData
	 */
	max: number;
}

/**
 *
 *
 * @export
 * @interface HistoricalTransformer
 */
export interface HistoricalTransformer {
	/**
	 *
	 *
	 * @param {KeyValuePair} data
	 * @param {KeyValuePair} options
	 * @returns {HistoricalData}
	 * @memberof HistoricalTransformer
	 */
	transform(data: KeyValuePair, options: KeyValuePair): HistoricalData;
}

/**
 *
 *
 * @export
 * @interface HistoricalPriceOptions
 */
export interface HistoricalPriceOptions {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof HistoricalPriceOptions
	 */
	token: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof HistoricalPriceOptions
	 */
	currency: string;
	/**
	 *
	 *
	 * @type {number}
	 * @memberof HistoricalPriceOptions
	 */
	days: number;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof HistoricalPriceOptions
	 */
	type: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof HistoricalPriceOptions
	 */
	dateFormat: string;
}

/**
 *
 *
 * @export
 * @interface HistoricalVolumeOptions
 */
export interface HistoricalVolumeOptions {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof HistoricalVolumeOptions
	 */
	token: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof HistoricalVolumeOptions
	 */
	currency: string;
	days: number;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof HistoricalVolumeOptions
	 */
	/**
	 *
	 *
	 * @type {string}
	 * @memberof HistoricalVolumeOptions
	 */
	type: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof HistoricalVolumeOptions
	 */
	dateFormat: string;
}

/**
 *
 *
 * @export
 * @interface DailyAverageOptions
 */
export interface DailyAverageOptions {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof DailyAverageOptions
	 */
	token: string;

	/**
	 *
	 *
	 * @type {string}
	 * @memberof DailyAverageOptions
	 */
	currency: string;

	/**
	 *
	 *
	 * @type {number}
	 * @memberof DailyAverageOptions
	 */
	timestamp: number;
}
