import { Coins, Contracts, Helpers } from "@arkecosystem/platform-sdk";

export const postGraphql = async (config: Coins.Config, query: string): Promise<Record<string, any>> =>
	(
		await config
			.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient)
			.post(Helpers.randomHostFromConfig(config, "archival").host, { query })
	).json().data;
