import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

export const postGraphql = async (config: Coins.Config, query: string): Promise<Record<string, any>> => {
	const response = await config
		.get<Contracts.HttpClient>("httpClient")
		.post(Arr.randomElement(config.get<string[]>("network.networking.hostsArchival")), { query });

	const json = response.json();

	if (json.errors) {
		throw Error(json.errors);
	}

	return json.data;
};
