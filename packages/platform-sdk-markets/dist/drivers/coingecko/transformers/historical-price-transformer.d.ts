import { Contracts } from "@arkecosystem/platform-sdk";
import { HistoricalData, HistoricalTransformer } from "../../../contracts";
/**
 * Implements a transformer for historical price data.
 *
 * @export
 * @class HistoricalPriceTransformer
 * @implements {HistoricalTransformer}
 */
export declare class HistoricalPriceTransformer implements HistoricalTransformer {
	private readonly data;
	/**
	 * Creates an instance of HistoricalPriceTransformer.
	 *
	 * @param {Contracts.KeyValuePair} data
	 * @memberof HistoricalPriceTransformer
	 */
	constructor(data: Contracts.KeyValuePair);
	/**
	 * Transforms the given data into a normalised format.
	 *
	 * @param {Contracts.KeyValuePair} options
	 * @returns {HistoricalData}
	 * @memberof HistoricalPriceTransformer
	 */
	transform(options: Contracts.KeyValuePair): HistoricalData;
}
