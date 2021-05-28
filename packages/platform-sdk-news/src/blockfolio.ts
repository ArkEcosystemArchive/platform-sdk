import { Contracts } from "@arkecosystem/platform-sdk";

import { BlockfolioResponse } from "./blockfolio.models";

/**
 * Implements Blockfolio Signal retrieval from the Platform SDK API.
 *
 * @export
 * @class Blockfolio
 */
export class Blockfolio {
	/**
	 * The HTTP client used for communication.
	 *
	 * @type {Contracts.HttpClient}
	 * @memberof Blockfolio
	 */
	readonly #httpClient: Contracts.HttpClient;

	/**
	 * Creates an instance of Blockfolio.
	 *
	 * @param {Contracts.HttpClient} httpClient
	 * @memberof Blockfolio
	 */
	public constructor(httpClient: Contracts.HttpClient) {
		this.#httpClient = httpClient;
	}

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
	public async findByCoin(query: {
		page?: number;
		query?: string;
		coins: string[];
		categories?: string[];
	}): Promise<BlockfolioResponse> {
		const { data, meta } = (await this.#httpClient.get(`https://platform.ark.io/api/coins/signals`, query)).json();

		return { data, meta };
	}
}
