import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "meetone.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "MEET.ONE",
	currency: {
		ticker: "MEETONE",
		symbol: "MEETONE",
		decimals: 4,
	},
	constants: {
		slip44: 194,
		bech32: "MEETONE",
	},
	hosts: [
		{
			type: "full",
			host: "https://fullnode.meet.one",
		},
		{
			type: "explorer",
			host: "https://meetone.bloks.io",
		},
	],
	transactions: {
		...transactions,
		fees: {
			type: "free",
			ticker: "MEETONE",
		},
	},
	importMethods,
	featureFlags,
	explorer,
	meta: {
		// @TODO
		networkId: "cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422",
	},
};

export default network;
