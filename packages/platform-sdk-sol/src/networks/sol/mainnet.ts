import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "sol.mainnet",
	type: "live",
	name: "Mainnet",
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
			host: "https://api.mainnet-beta.solana.com",
		},
		{
			type: "explorer",
			host: "https://explorer.solana.com",
		},
	],
	transactions,
	importMethods,
	featureFlags,
};

export default network;
