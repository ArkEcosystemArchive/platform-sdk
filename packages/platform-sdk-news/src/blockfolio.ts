import { Contracts } from "@arkecosystem/platform-sdk";

import { BlockfolioResponse } from "./blockfolio.models";

export class Blockfolio {
	readonly #httpClient: Contracts.HttpClient;

	public constructor(httpClient: Contracts.HttpClient) {
		this.#httpClient = httpClient;
	}

	public async findByCoin(coin: string, page = 1): Promise<BlockfolioResponse> {
		const { data, meta }: any = (
			await this.#httpClient.get(`https://platform.ark.io/api/coins/${coin}/signals`, {
				page,
			})
		).json();

		return { data, meta };
	}
}
