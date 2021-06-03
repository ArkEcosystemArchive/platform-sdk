import { Networks } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "wax.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "WAX",
	currency: {
		ticker: "WAX",
		symbol: "WAX",
		decimals: 4,
	},
	constants: {
		slip44: 194,
		bech32: "WAX",
	},
	hosts: [
		{
			type: "full",
			host: "https://wax.eosphere.io",
		},
		{
			type: "explorer",
			host: "https://wax.bloks.io",
		},
	],
	transactions: {
		...transactions,
		fees: {
			type: "free",
			ticker: "WAX",
		},
	},
	importMethods,
	featureFlags,
	meta: {
		// @TODO
		networkId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
	},
};

export default network;
