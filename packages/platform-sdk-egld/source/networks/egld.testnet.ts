import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

const network: Networks.NetworkManifest = {
	id: "egld.testnet",
	type: "test",
	name: "Testnet",
	coin: "Elrond",
	currency: {
		ticker: "XeGLD",
		symbol: "XeGLD",
		decimals: 18,
	},
	constants: {
		slip44: 508,
	},
	hosts: [
		{
			type: "full",
			host: "https://testnet-gateway.elrond.com",
		},
		{
			type: "explorer",
			host: "https://testnet-explorer.elrond.com",
		},
	],
	transactions: {
		...transactions,
		fees: {
			type: "static",
			ticker: "XeGLD",
		},
	},
	importMethods,
	featureFlags,
	explorer,
};

export default network;
