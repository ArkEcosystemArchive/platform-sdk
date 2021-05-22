import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "eth.kovan",
	type: "test",
	name: "Kovan",
	coin: "Ethereum",
	currency: {
		ticker: "ETH",
		symbol: "Ξ",
	},
	constants: {
		slip44: 60,
	},
	hosts: [
		{
			type: "full",
			host: "https://coins.com/api/eth",
		},
		{
			type: "explorer",
			host: "https://kovan.etherscan.io/",
		},
	],
	transactions,
	importMethods,
	featureFlags,
	meta: {
		// @TODO
		networkId: "2",
	}
};

export default network;
