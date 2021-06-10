import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

const network: Networks.NetworkManifest = {
	id: "sol.testnet",
	type: "test",
	name: "Testnet",
	coin: "Solana",
	currency: {
		ticker: "SOL",
		symbol: "SOL",
		decimals: 9,
	},
	constants: {
		slip44: 501,
	},
	hosts: [
		{
			type: "full",
			host: "https://testnet.solana.com",
		},
		{
			type: "explorer",
			host: "https://explorer.solana.com",
			query: { cluster: "testnet" },
		},
	],
	transactions,
	importMethods,
	featureFlags,
	explorer,
};

export default network;
