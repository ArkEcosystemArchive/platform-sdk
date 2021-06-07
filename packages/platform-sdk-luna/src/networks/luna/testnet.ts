import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "luna.testnet",
	type: "test",
	name: "Testnet",
	coin: "Luna",
	currency: {
		ticker: "SOJU",
		symbol: "SOJU",
		decimals: 6,
	},
	constants: {
		slip44: 330,
	},
	hosts: [
		{
			type: "full",
			host: "https://soju-lcd.terra.dev",
		},
		{
			type: "explorer",
			host: "https://finder.terra.money/columbus-4",
		},
	],
	transactions: {
		...transactions,
		fees: {
			type: "dynamic",
			ticker: "SOJU",
		},
	},
	importMethods,
	featureFlags,
	explorer,
};

export default network;
