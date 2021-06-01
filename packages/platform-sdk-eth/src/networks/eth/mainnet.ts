import { Coins } from "@arkecosystem/platform-sdk";
import tokens from "./mainnet.tokens.json";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "eth.mainnet",
	type: "live",
	name: "Mainnet",
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
			host: "https://etherscan.io",
		},
	],
	transactions,
	importMethods,
	featureFlags,
	tokens,
	meta: {
		// @TODO
		networkId: "1",
	},
};

export default network;
