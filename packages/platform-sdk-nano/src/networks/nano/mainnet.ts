import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "nano.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Nano",
	currency: {
		ticker: "NANO",
		symbol: "NANO",
		decimals: 30,
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
	explorer,
};

export default network;
