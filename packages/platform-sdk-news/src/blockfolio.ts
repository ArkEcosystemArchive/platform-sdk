import { Contracts } from "@arkecosystem/platform-sdk";

import { BlockfolioResponse } from "./blockfolio.models";

export class Blockfolio {
	readonly #httpClient: Contracts.HttpClient;

	public constructor(httpClient: Contracts.HttpClient) {
		this.#httpClient = httpClient;
	}

	public async findByCoin(query: { page?: number; query?: string; coins: string[], categories?: string[] },): Promise<BlockfolioResponse> {
		const { data, meta }: any = (await this.#httpClient.get(`https://platform.ark.io/api/coins/signals`, query)).json();

		return { data, meta };
	}
}
