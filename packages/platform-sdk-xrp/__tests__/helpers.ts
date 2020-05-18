import { Coins } from "@arkecosystem/platform-sdk";

import { schema } from "../src/schema";
import { manifest } from "../src/manifest";

export const createConfig = (options?: object) => {
	const config = new Coins.Config(options || {
		network: "testnet", // peer: "wss://s.altnet.rippletest.net:51233",
		peer: "ws://localhost:51233",
	}, schema)

	config.set('network', manifest.networks.testnet)

	return config
};
