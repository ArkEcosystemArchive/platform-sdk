import { Coins } from "@arkecosystem/platform-sdk";
import { Request } from "@arkecosystem/platform-sdk-http-got";

import { container } from "../src/container";
import { Bindings } from "../src/contracts";
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

export const createConfigWithNetwork = (options?: object, meta = {}) => {
	if (container.missing(Bindings.Crypto)) {
		container.constant(Bindings.Crypto, require(`${__dirname}/fixtures/client/cryptoConfiguration.json`).data);
	}

	if (container.missing(Bindings.Status)) {
		container.constant(Bindings.Status, require(`${__dirname}/fixtures/client/syncing.json`).data);
	}

	return createConfig(options, meta);
};

export const createNetworkConfig = () => require(`${__dirname}/fixtures/client/cryptoConfiguration.json`).data.network;
