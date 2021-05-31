import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "lsk.testnet",
	type: "test",
	name: "Testnet",
	coin: "Lisk",
	currency: {
		ticker: "LSK",
		symbol: "LSK",
		decimals: 8,
	},
	constants: {
		slip44: 134,
	},
	hosts: [
		{
			type: "full",
			host: "https://testnet.lisk.io",
		},
		{
			type: "explorer",
			host: "https://testnet-explorer.lisk.io/",
		},
	],
	governance: {
		delegateCount: 101,
		votesPerWallet: 101,
		votesPerTransaction: 33,
	},
	transactions,
	importMethods,
	featureFlags,
	meta: {
		// @TODO
		networkId: "da3ed6a45429278bac2666961289ca17ad86595d33b31037615d4b8e8f158bba",
	},
};

export default network;
