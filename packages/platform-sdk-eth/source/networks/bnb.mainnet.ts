import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

const network: Networks.NetworkManifest = {
	id: "bnb.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Binance",
	currency: {
		ticker: "BNB",
		symbol: "BNB",
		decimals: 18,
	},
	constants: {
		slip44: 714,
	},
	hosts: [
		{
			type: "full",
			host: "https://bsc-dataseed1.binance.org:443",
		},
		{
			type: "explorer",
			host: "https://binance.mintscan.io",
		},
	],
	transactions,
	importMethods,
	featureFlags,
	explorer,
};

export default network;
