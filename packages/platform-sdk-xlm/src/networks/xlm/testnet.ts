import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "xlm.testnet",
	type: "test",
	name: "Testnet",
	coin: "Stellar",
	currency: {
		ticker: "XLM",
		symbol: "XLM",
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
};

export default network;
