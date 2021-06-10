import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

const network: Networks.NetworkManifest = {
	id: "trx.testnet",
	type: "test",
	name: "Testnet",
	coin: "TRON",
	currency: {
		ticker: "TRX",
		symbol: "TRX",
		decimals: 6,
	},
	constants: {
		slip44: 195,
	},
	hosts: [
		{
			type: "full",
			host: "https://api.shasta.trongrid.io",
		},
		{
			type: "explorer",
			host: "https://shasta.tronscan.org/#",
		},
	],
	transactions,
	importMethods,
	featureFlags,
	explorer,
};

export default network;
