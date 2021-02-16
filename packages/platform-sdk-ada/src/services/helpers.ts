import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

export const postGraphql = async (config: Coins.Config, query: string): Promise<Record<string, any>> => {
	console.log('query', query);
	const keyValuePair = await config
		.get<Contracts.HttpClient>("httpClient")
		.post(Arr.randomElement(config.get<string[]>("network.networking.hostsArchival")), { query });
	console.log('keyValuePair', JSON.stringify(keyValuePair.json(), null, 2));
	return keyValuePair.json().data;
};
