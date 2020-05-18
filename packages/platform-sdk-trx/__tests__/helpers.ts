import { Coins } from "@arkecosystem/platform-sdk";

import { schema } from "../src/schema";
import { manifest } from "../src/manifest";

export const createConfig = (options?: object) => {
	const config = new Coins.Config(options || { network: "testnet", peer: "https://api.shasta.trongrid.io" }, schema)

	config.set('network', manifest.networks.testnet)

	return config
};
