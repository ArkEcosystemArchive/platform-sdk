import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "xrp.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "XRP",
	currency: {
		ticker: "XRP",
		symbol: "XRP",
		decimals: 6,
	},
	constants: {
		slip44: 144,
	},
	hosts: [
		{
			type: "full",
			host: "https://s2.ripple.com:51234/",
		},
		{
			type: "explorer",
			host: "https://livenet.xrpl.org",
		},
	],
	transactions,
	importMethods,
	featureFlags,
	explorer,
};

export default network;
