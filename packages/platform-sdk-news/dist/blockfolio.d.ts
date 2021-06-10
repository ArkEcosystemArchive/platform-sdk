import { HttpClient } from "@arkecosystem/platform-sdk-http";
import { BlockfolioResponse } from "./blockfolio.models";
/**
 * Implements Blockfolio Signal retrieval from the Platform SDK API.
 *
 * @export
 * @class Blockfolio
 */
export declare class Blockfolio {
	#private;
	/**
	 * Creates an instance of Blockfolio.
	 *
	 * @param {HttpClient} httpClient
	 * @memberof Blockfolio
	 */
	constructor(httpClient: HttpClient);
	/**
	 * Retrieves signals for a given coin.
	 *
	 * @param {{
	 * 		page?: number;
	 * 		query?: string;
	 * 		coins: string[];
	 * 		categories?: string[];
	 * 	}} query
	 * @returns {Promise<BlockfolioResponse>}
	 * @memberof Blockfolio
	 */
	findByCoin(query: {
		page?: number;
		query?: string;
		coins: string[];
		categories?: string[];
	}): Promise<BlockfolioResponse>;
}
