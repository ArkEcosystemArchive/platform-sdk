import { Coins, Helpers } from "@arkecosystem/platform-sdk";
import { Zilliqa } from "@zilliqa-js/zilliqa";

import { manifest } from "../src/manifest";
import { schema } from "../src/schema";

export const createConfig = (options?: object) => {
	const config = new Coins.Config({ ...options, network: "zil.testnet" }, schema);

	config.set(Coins.ConfigKey.Network, manifest.networks["zil.testnet"]);

	return config;
};

export const mockWallet = () => (
	new Zilliqa(Helpers.randomHostFromConfig(createConfig())).wallet
);
