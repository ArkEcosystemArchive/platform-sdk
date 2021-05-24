import { Coins } from "@arkecosystem/platform-sdk";
import { Request } from "@arkecosystem/platform-sdk-http-got";

import { manifest } from "../src/manifest";
import { schema } from "../src/schema";

export const createConfig = (options?: object) => {
	const config = new Coins.Config(
		{ ...(options || { network: "atom.testnet" }), ...{ httpClient: new Request() } },
		schema,
	);

	config.set(Coins.ConfigKey.Network, manifest.networks["atom.testnet"]);

	return config;
};
