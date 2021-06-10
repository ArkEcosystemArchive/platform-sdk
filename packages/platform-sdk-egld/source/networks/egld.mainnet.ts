import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

const network: Networks.NetworkManifest = {
	id: "egld.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Elrond",
	currency: {
		ticker: "EGLD",
		symbol: "EGLD",
		decimals: 18,
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
	explorer,
};

export default network;
