import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "atom.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Cosmos",
	currency: {
		ticker: "ATOM",
		symbol: "ATOM",
	},
	constants: {
		slip44: 118,
		bech32: "cosmos",
	},
	hosts: [
		{
			type: "full",
			host: "https://node.atomscan.com",
		},
		{
			type: "explorer",
			host: "https://stake.id/",
		},
	],
	transactions,
	importMethods,
	featureFlags,
	meta: {
		// @TODO
		networkId: "cosmoshub-3",
	},
};

export default network;
