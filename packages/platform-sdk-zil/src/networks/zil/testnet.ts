import { Networks } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "zil.testnet",
	type: "test",
	name: "Testnet",
	coin: "Zilliqa",
	currency: {
		ticker: "ZIL",
		symbol: "ZIL",
		decimals: 12,
	},
	constants: {
		slip44: 313,
	},
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
	transactions,
	importMethods,
	featureFlags,
};

export default network;
