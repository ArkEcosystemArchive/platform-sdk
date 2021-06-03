import { Networks } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
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
			host: "https://apis.compendia.org",
		},
		{
			type: "explorer",
			host: "https://bindscan.io",
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
	meta: {
		fastDelegateSync: true,
	},
};

export default network;
