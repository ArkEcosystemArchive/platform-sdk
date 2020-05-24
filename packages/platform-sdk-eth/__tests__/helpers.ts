import { Coins } from "@arkecosystem/platform-sdk";

import { manifest } from "../src/manifest";
import { schema } from "../src/schema";

export const createConfig = (options?: object) => {
	const config = new Coins.Config(options || { network: "ropsten" }, schema);

	config.set("network", manifest.networks.ropsten);

	return config;
};
