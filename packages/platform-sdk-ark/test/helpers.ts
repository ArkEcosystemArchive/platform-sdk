import { Coins } from "@arkecosystem/platform-sdk";
import { Request } from "@arkecosystem/platform-sdk-http-got";

import { manifest } from "../src/manifest";
import { schema } from "../src/schema";

export const createConfig = (options?: object, meta = {}) => {
	const config = new Coins.Config(
		{
			...(options || { network: "ark.devnet" }),
			...{ httpClient: new Request() },
		},
		schema,
	);

	// @ts-ignore
	config.set(Coins.ConfigKey.Network, manifest.networks[options?.network || "ark.devnet"]);

	for (const [key, value] of Object.entries(meta)) {
		config.set(key, value);
	}

	return config;
};

export const createConfigWithNetwork = () =>
	createConfig(undefined, {
		NETWORK_CONFIGURATION: {
			crypto: require(`${__dirname}/fixtures/client/cryptoConfiguration.json`).data,
			status: require(`${__dirname}/fixtures/client/syncing.json`).data,
		},
	});

export const createNetworkConfig = () => require(`${__dirname}/fixtures/client/cryptoConfiguration.json`).data.network;
