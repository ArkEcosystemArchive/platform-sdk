import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

const network: Networks.NetworkManifest = {
	id: "xlm.testnet",
	type: "test",
	name: "Testnet",
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
			host: "https://horizon-testnet.stellar.org",
		},
		{
			type: "explorer",
			host: "https://testnet.steexp.com",
		},
	],
	transactions,
	importMethods,
	featureFlags,
	explorer,
};

export default network;
