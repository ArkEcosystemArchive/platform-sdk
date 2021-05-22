import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "nano.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Nano",
	currency: {
		ticker: "NANO",
		symbol: "NANO",
	},
	constants: {
		slip44: 165,
	},
	hosts: [
		{
			type: "full",
			host: "https://proxy.nanos.cc/proxy",
		},
		{
			type: "explorer",
			host: "https://nanocrawler.cc",
		},
	],
	transactions,
	importMethods,
	featureFlags,
};

export default network;
