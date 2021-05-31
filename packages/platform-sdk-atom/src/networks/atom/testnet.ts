import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "atom.testnet",
	type: "test",
	name: "Testnet",
	coin: "Cosmos",
	currency: {
		ticker: "MUON",
		symbol: "MUON",
		decimals: 6,
	},
	constants: {
		slip44: 118,
		bech32: "cosmos",
	},
	hosts: [
		{
			type: "full",
			host: "https://stargate.cosmos.network",
		},
		{
			type: "explorer",
			host: "https://gaia.stake.id",
		},
	],
	transactions: {
		...transactions,
		...{
			fees: {
				type: "static",
				ticker: "MUON",
			},
		},
	},
	importMethods,
	featureFlags,
	meta: {
		// @TODO
		networkId: "gaia-13007",
	},
};

export default network;
