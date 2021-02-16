import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

export const postGraphql = (config: Coins.Config, query: object): Promise<Record<string, any>> => (
	await config
		.get<Contracts.HttpClient>("httpClient")
		.post(Arr.randomElement(config.get<string[]>("network.networking.hostsArchival")), { query })
).json().data;
