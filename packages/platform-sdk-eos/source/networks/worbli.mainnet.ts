import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

const network: Networks.NetworkManifest = {
	id: "worbli.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Worbli",
	currency: {
		ticker: "WBI",
		symbol: "WBI",
		decimals: 4,
	},
	constants: {
		slip44: 194,
		bech32: "WBI",
	},
	hosts: [
		{
			type: "full",
			host: "https://api.worbli.io",
		},
		{
			type: "full",
			host: "https://worbli-mainnet.eosblocksmith.io",
		},
		{
			type: "explorer",
			host: "https://worbli.bloks.io",
		},
	],
	transactions: {
		...transactions,
		fees: {
			type: "free",
			ticker: "WBI",
		},
	},
	importMethods,
	featureFlags,
	explorer,
	meta: {
		// @TODO
		networkId: "73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f",
	},
};

export default network;
