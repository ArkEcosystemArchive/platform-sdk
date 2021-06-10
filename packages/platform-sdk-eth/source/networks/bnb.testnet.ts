import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

const network: Networks.NetworkManifest = {
	id: "bnb.testnet",
	type: "test",
	name: "Testnet",
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
			host: "https://data-seed-prebsc-1-s1.binance.org:8545",
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
