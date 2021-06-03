import { Networks } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "xlm.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Stellar",
	currency: {
		ticker: "XLM",
		symbol: "XLM",
		decimals: 7,
	},
	constants: {
		slip44: 148,
	},
	hosts: [
		{
			type: "full",
			host: "https://horizon.stellar.org",
		},
		{
			type: "explorer",
			host: "https://steexp.com",
		},
	],
	transactions,
	importMethods,
	featureFlags,
};

export default network;
