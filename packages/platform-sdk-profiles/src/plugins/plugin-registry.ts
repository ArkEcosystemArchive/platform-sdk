import { Contracts } from "@arkecosystem/platform-sdk";

import { RegistryPluginListResponse, RegistryPluginResponse } from "./plugin-registry.models";

export class PluginRegistry {
	readonly #httpClient: Contracts.HttpClient;

	public constructor(httpClient: Contracts.HttpClient) {
		this.#httpClient = httpClient;
	}

	public async all(
		query: {
			page?: number;
			perPage?: string;
			is_featured?: boolean;
			is_official?: boolean;
			is_promoted?: boolean;
			is_verified?: boolean;
		} = {},
	): Promise<RegistryPluginListResponse> {
		const { data, meta }: any = (await this.#httpClient.get("https://marketsquare.io/api/plugins", query)).json();

		return { data, meta };
	}

	public async findById(id: number): Promise<RegistryPluginResponse> {
		const { data }: any = (await this.#httpClient.get(`https://marketsquare.io/api/plugins/${id}`)).json();

		return data;
	}
}
