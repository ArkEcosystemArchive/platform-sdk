import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "eth.goerli",
	type: "test",
	name: "Goerli",
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
			host: "https://goerli.etherscan.io/",
		},
	],
	transactions,
	importMethods,
	featureFlags,
	meta: {
		// @TODO
		networkId: "5",
	},
};

export default network;
