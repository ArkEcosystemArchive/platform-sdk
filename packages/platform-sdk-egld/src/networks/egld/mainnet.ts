import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "egld.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Elrond",
	currency: {
		ticker: "EGLD",
		symbol: "EGLD",
	},
	constants: {
		slip44: 508,
	},
	hosts: [
		{
			type: "full",
			host: "https://gateway.elrond.com",
		},
		{
			type: "explorer",
			host: "https://explorer.elrond.com",
		},
	],
	transactions,
	importMethods,
	featureFlags,
};

export default network;
