import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "luna.testnet",
	type: "test",
	name: "Testnet",
	coin: "Luna",
	currency: {
		ticker: "SOJU",
		symbol: "SOJU",
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
			host: "@TODO",
		},
	],
	transactions: {
		...transactions,
		...{
			fees: {
				type: "dynamic",
				ticker: "SOJU",
			},
		},
	},
	importMethods,
	featureFlags,
};

export default network;
