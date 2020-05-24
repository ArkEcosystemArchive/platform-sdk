import { Coins } from "@arkecosystem/platform-sdk";

import { manifest } from "../src/manifest";
import { schema } from "../src/schema";

export const createConfig = (options?: object) => {
	const config = new Coins.Config(
		options || {
			network: "testnet", // peer: "wss://s.altnet.rippletest.net:51233",
			peer: "ws://localhost:51233",
		},
		schema,
	);

	config.set("network", manifest.networks.testnet);

	return config;
};
