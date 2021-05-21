import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "compendia.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Compendia",
	currency: {
		ticker: "BIND",
		symbol: "ß",
	},
	constants: {
		slip44: 543,
	},
	hosts: [
		{
			type: "full",
			host: { url: "https://apis.compendia.org" },
		},
		{
			type: "explorer",
			host: { url: "https://bindscan.io/" },
		},
	],
	governance: {
		delegateCount: 47,
		votesPerWallet: 1,
		votesPerTransaction: 1,
	},
	transactions: {
		...transactions,
		...{
			fees: {
				type: "dynamic",
				ticker: "BIND",
			},
		},
	},
	importMethods,
	featureFlags,
};

export default network;
