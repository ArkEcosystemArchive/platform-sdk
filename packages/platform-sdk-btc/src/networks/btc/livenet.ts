import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
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
			host: "https://coins.com/api/btc",
		},
		{
			type: "explorer",
			host: "https://blockstream.info",
		},
	],
	transactions,
	importMethods,
	featureFlags,
};

export default network;
