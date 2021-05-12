import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

export const postGraphql = async (config: Coins.Config, query: string): Promise<Record<string, any>> =>
	(
		await config
			.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient)
			.post(Arr.randomElement(config.get<string[]>("network.networking.hostsArchival")), { query })
	).json().data;
