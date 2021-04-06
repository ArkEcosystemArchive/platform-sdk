import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

export const postGraphql = async (config: Coins.Config, query: string): Promise<Record<string, any>> => {
	console.log("query", query);
	const keyValuePair = await config
		.get<Contracts.HttpClient>("httpClient")
		.post(Arr.randomElement(config.get<string[]>("network.networking.hostsArchival")), { query });
	const json = keyValuePair.json();

	if (json.errors) {
		console.warn("error", json.errors[0].message);
		throw Error(json.errors);
	}
	console.log("keyValuePair", JSON.stringify(json, null, 2));
	return json.data;
};
