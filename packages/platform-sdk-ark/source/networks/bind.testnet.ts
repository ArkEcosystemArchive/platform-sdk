import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

const network: Networks.NetworkManifest = {
	id: "bind.testnet",
	type: "test",
	name: "Testnet",
	coin: "Compendia",
	currency: {
		ticker: "TBIND",
		symbol: "Tß",
		decimals: 8,
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
	explorer,
	meta: {
		fastDelegateSync: true,
	},
};

export default network;
