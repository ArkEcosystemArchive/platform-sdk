import { Coins } from "@arkecosystem/platform-sdk";

import { schema } from "../src/schema";
import { manifest } from "../src/manifest";

export const createConfig = (options?: object) => {
	const config = new Coins.Config(options || { network: "ropsten", peer: "https://coins.com/api/eth" }, schema)

	config.set('network', manifest.networks.ropsten)

	return config
};
