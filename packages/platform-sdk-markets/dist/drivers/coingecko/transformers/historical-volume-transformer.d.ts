import { Contracts } from "@arkecosystem/platform-sdk";
import { HistoricalData, HistoricalTransformer } from "../../../contracts";
/**
 * Implements a transformer for historical volume data.
 *
 * @export
 * @class HistoricalVolumeTransformer
 * @implements {HistoricalTransformer}
 */
export declare class HistoricalVolumeTransformer implements HistoricalTransformer {
	private readonly data;
	/**
	 * Creates an instance of HistoricalVolumeTransformer.
	 *
	 * @param {Contracts.KeyValuePair} data
	 * @memberof HistoricalVolumeTransformer
	 */
	constructor(data: Contracts.KeyValuePair);
	/**
	 * Transforms the given data into a normalised format.
	 *
	 * @param {Contracts.KeyValuePair} options
	 * @returns {HistoricalData}
	 * @memberof HistoricalVolumeTransformer
	 */
	transform(options: Contracts.KeyValuePair): HistoricalData;
}
