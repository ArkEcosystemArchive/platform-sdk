import { Networks } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "compendia.testnet",
	type: "test",
	name: "Testnet",
	coin: "Compendia",
	currency: {
		ticker: "TBIND",
		symbol: "Tß",
	},
	constants: {
		slip44: 1,
	},
	hosts: [
		{
			type: "full",
			host: "http://apis-testnet.compendia.org/api",
		},
		{
			type: "explorer",
			host: "https://testnet.bindscan.io",
		},
	],
	governance: {
		delegateCount: 47,
		votesPerWallet: 1,
		votesPerTransaction: 1,
	},
	transactions: {
		...transactions,
		fees: {
			type: "dynamic",
			ticker: "TBIND",
		},
	},
	importMethods,
	featureFlags,
	meta: {
		fastDelegateSync: true,
	},
};

export default network;
