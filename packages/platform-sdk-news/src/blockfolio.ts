import { Contracts } from "@arkecosystem/platform-sdk";

export class Blockfolio {
	readonly #httpClient: Contracts.HttpClient;

	public constructor(httpClient: Contracts.HttpClient) {
		this.#httpClient = httpClient;
	}

	public async findByCoin(coin: string, page = 1): Promise<any> {
		const { data, meta } = (
			await this.#httpClient.get(`https://platform.ark.io/coins/${coin}/signals`, { page })
		).json();

		return { data, meta };
	}
}
