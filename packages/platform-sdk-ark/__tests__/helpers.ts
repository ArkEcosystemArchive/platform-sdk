import { Coins } from "@arkecosystem/platform-sdk";

import { schema } from "../src/schema";
import { manifest } from "../src/manifest";

export const createConfig = (options?: object) => {
	const config = new Coins.Config(options || { network: "devnet", peer: "https://dexplorer.ark.io/api" }, schema)

	config.set('network', manifest.networks.devnet)

	return config
};
