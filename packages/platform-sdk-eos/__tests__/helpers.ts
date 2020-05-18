import { Coins } from "@arkecosystem/platform-sdk";

import { schema } from "../src/schema";
import { manifest } from "../src/manifest";

export const createConfig = (options?: object) => {
	const config = new Coins.Config(options || { network: "testnet" }, schema);

	config.set("network", manifest.networks["eos.testnet"]);

	return config;
};
