import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "luna.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Luna",
	currency: {
		ticker: "LUNA",
		symbol: "LUNA",
	},
	constants: {
		slip44: 330,
	},
	hosts: [
		{
			type: "full",
			host: "https://luna-lcd.terra.dev/",
		},
		{
			type: "explorer",
			host: "@TODO",
		},
	],
	transactions,
	importMethods,
	featureFlags,
};

export default network;
