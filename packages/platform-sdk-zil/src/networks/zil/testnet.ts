import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "zil.testnet",
	type: "test",
	name: "Testnet",
	coin: "Zilliqa",
	hosts: [
		{
			type: "full",
			host: "https://dev-api.zilliqa.com",
		},
		{
			type: "explorer",
			host: "https://viewblock.io/zilliqa",
			query: { network: "testnet" },
		},
	],
	currency: {
		ticker: "ZIL",
		symbol: "ZIL",
	},
	constants: {
		slip44: 313,
	},
	transactions,
	importMethods,
	featureFlags,
};

export default network;
