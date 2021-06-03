import { Networks } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "trx.mainnet",
	type: "live",
	name: "Mainnet",
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
			host: "https://api.trongrid.io",
		},
		{
			type: "explorer",
			host: "https://tronscan.org/#",
		},
	],
	transactions,
	importMethods,
	featureFlags,
};

export default network;
