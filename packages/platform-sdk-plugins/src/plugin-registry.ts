import { Contracts } from "@arkecosystem/platform-sdk";

import { RegistryResponse } from "./plugin-registry.models";

export class PluginRegistry {
	readonly #httpClient: Contracts.HttpClient;

	public constructor(httpClient: Contracts.HttpClient) {
		this.#httpClient = httpClient;
	}

	public async all(page = 1): Promise<RegistryResponse> {
		const { data, meta }: any = (
			await this.#httpClient.get("https://marketsquare.io/api/plugins", { page })
		).json();

		return { data, meta };
	}
}
