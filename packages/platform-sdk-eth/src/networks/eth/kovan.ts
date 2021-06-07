import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "eth.kovan",
	type: "test",
	name: "Kovan",
	coin: "Ethereum",
	currency: {
		ticker: "ETH",
		symbol: "Ξ",
		decimals: 18,
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
			host: "https://kovan.etherscan.io",
		},
	],
	transactions,
	importMethods,
	featureFlags,
	explorer,
	meta: {
		// @TODO
		networkId: "2",
	},
};

export default network;
