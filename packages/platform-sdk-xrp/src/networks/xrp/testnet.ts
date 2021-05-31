import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "xrp.testnet",
	type: "test",
	name: "Testnet",
	coin: "XRP",
	currency: {
		ticker: "XRP",
		symbol: "XRP",
		decimals: 6,
	},
	constants: {
		slip44: 144,
	},
	hosts: [
		{
			type: "full",
			host: "https://s.altnet.rippletest.net:51234/",
		},
		{
			type: "explorer",
			host: "https://testnet.xrpl.org/",
		},
	],
	transactions,
	importMethods,
	featureFlags,
};

export default network;
