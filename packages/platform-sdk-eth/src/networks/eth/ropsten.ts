import { Networks } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "eth.ropsten",
	type: "test",
	name: "Ropsten",
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
			host: "https://platform.ark.io/api/eth",
		},
		{
			type: "explorer",
			host: "https://ropsten.etherscan.io",
		},
	],
	transactions,
	importMethods,
	featureFlags,
	meta: {
		// @TODO
		networkId: "3",
	},
};

export default network;
