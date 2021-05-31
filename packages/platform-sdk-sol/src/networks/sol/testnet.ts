import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
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
			host: "https://explorer.solana.com/",
			query: { cluster: "testnet" },
		},
	],
	transactions,
	importMethods,
	featureFlags,
};

export default network;
