import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "zil.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Zilliqa",
	currency: {
		ticker: "ZIL",
		symbol: "ZIL",
	},
	constants: {
		slip44: 313,
	},
	hosts: [
		{
			type: "full",
			host: { url: "https://api.zilliqa.com" },
		},
		{
			type: "explorer",
			host: { url: "https://viewblock.io/zilliqa" },
		},
	],
	transactions,
	importMethods,
	featureFlags,
};

export default network;
