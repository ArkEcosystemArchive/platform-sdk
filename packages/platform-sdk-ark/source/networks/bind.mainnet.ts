import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

const network: Networks.NetworkManifest = {
	id: "bind.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Compendia",
	currency: {
		ticker: "BIND",
		symbol: "ß",
		decimals: 8,
	},
	constants: {
		slip44: 543,
	},
	hosts: [
		{
			type: "full",
			host: "https://apis.compendia.org/api",
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
		fees: {
			type: "dynamic",
			ticker: "BIND",
		},
		multiPaymentRecipients: 64,
	},
	importMethods,
	featureFlags,
	explorer,
	meta: {
		fastDelegateSync: true,
	},
};

export default network;
