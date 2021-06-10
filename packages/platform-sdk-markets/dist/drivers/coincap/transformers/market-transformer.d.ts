import { Contracts } from "@arkecosystem/platform-sdk";
import { MarketDataCollection } from "../../../contracts";
/**
 * Implements a transformer for historical market data.
 *
 * @export
 * @class MarketTransformer
 * @implements {MarketTransformer}
 */
export declare class MarketTransformer implements MarketTransformer {
	#private;
	private readonly data;
	/**
	 *
	 *
	 * @private
	 * @type {string}
	 * @memberof MarketTransformer
	 */
	private readonly baseCurrency;
	/**
	 * Creates an instance of MarketTransformer.
	 *
	 * @param {Contracts.KeyValuePair} data
	 * @memberof MarketTransformer
	 */
	constructor(data: Contracts.KeyValuePair);
	/**
	 * Transforms the given data into a normalised format.
	 *
	 * @param {Contracts.KeyValuePair} options
	 * @returns {MarketDataCollection}
	 * @memberof MarketTransformer
	 */
	transform(options: Contracts.KeyValuePair): MarketDataCollection;
}
