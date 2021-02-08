import { Coins } from "@arkecosystem/platform-sdk";
import { Request } from "@arkecosystem/platform-sdk-http-got";

import { manifest } from "../src/manifest";
import { schema } from "../src/schema";

export const createConfig = (options?: object, meta = {}) => {
	const config = new Coins.Config(
		{
			...(options || { network: "avax.mainnet" }),
			...{ httpClient: new Request() },
		},
		schema,
	);

	// @ts-ignore
	config.set(Coins.ConfigKey.Network, manifest.networks[options?.network || "avax.mainnet"]);

	for (const [key, value] of Object.entries(meta)) {
		config.set(key, value);
	}

	return config;
};
