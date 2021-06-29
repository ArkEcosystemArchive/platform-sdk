import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

const network: Networks.NetworkManifest = {
	id: "btc.livenet",
	type: "live",
	name: "Livenet",
	coin: "Bitcoin",
	currency: {
		ticker: "BTC",
		symbol: "Ƀ",
		decimals: 8,
	},
	constants: {
		slip44: 0,
	},
	hosts: [
		{
			type: "full",
			host: "http://51.210.0.39:8898/api",
		},
		{
			type: "explorer",
			host: "https://blockstream.info",
		},
	],
	transactions,
	importMethods,
	featureFlags,
	explorer,
};

export default network;
