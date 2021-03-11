import { Contracts } from "@arkecosystem/platform-sdk";

import { BlockfolioResponse } from "./blockfolio.models";

/**
 *
 *
 * @export
 * @class Blockfolio
 */
export class Blockfolio {
	/**
	 *
	 *
	 * @type {Contracts.HttpClient}
	 * @memberof Blockfolio
	 */
	readonly #httpClient: Contracts.HttpClient;

	/**
	 *Creates an instance of Blockfolio.
	 * @param {Contracts.HttpClient} httpClient
	 * @memberof Blockfolio
	 */
	public constructor(httpClient: Contracts.HttpClient) {
		this.#httpClient = httpClient;
	}

	/**
	 *
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
		const { data, meta }: any = (
			await this.#httpClient.get(`https://platform.ark.io/api/coins/signals`, query)
		).json();

		return { data, meta };
	}
}
