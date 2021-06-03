import { Coins, Helpers } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";

export const postGraphql = async (config: Coins.Config, query: string): Promise<Record<string, any>> =>
	(
		await config
			.get<HttpClient>(Coins.ConfigKey.HttpClient)
			.post(Helpers.randomHostFromConfig(config, "archival"), { query })
	).json().data;
