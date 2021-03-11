import { KeyValuePair } from "../types";

/**
 *
 *
 * @export
 * @interface MarketData
 */
export interface MarketData {
	/**
	 *
	 *
	 * @type {number}
	 * @memberof MarketData
	 */
	currency: number;

	/**
	 *
	 *
	 * @type {number}
	 * @memberof MarketData
	 */
	price: number;

	/**
	 *
	 *
	 * @type {number}
	 * @memberof MarketData
	 */
	marketCap: number;

	/**
	 *
	 *
	 * @type {number}
	 * @memberof MarketData
	 */
	volume: number;

	/**
	 *
	 *
	 * @type {Date}
	 * @memberof MarketData
	 */
	date: Date;

	/**
	 *
	 *
	 * @type {number}
	 * @memberof MarketData
	 */
	change24h: number;
}

export type MarketDataCollection = Record<string, MarketData>;

/**
 *
 *
 * @export
 * @interface MarketTransformer
 */
export interface MarketTransformer {
	transform(options: KeyValuePair): MarketDataCollection;
}
