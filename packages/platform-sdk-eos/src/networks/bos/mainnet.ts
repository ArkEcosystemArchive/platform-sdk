import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "bos.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "BOSCore",
	currency: {
		ticker: "BOS",
		symbol: "BOS",
		decimals: 4,
	},
	constants: {
		slip44: 194,
		bech32: "BOS",
	},
	hosts: [
		{
			type: "full",
			host: "https://api.boscore.io",
		},
		{
			type: "explorer",
			host: "https://bos.bloks.io",
		},
	],
	transactions: {
		...transactions,
		fees: {
			type: "free",
			ticker: "BOS",
		},
	},
	importMethods,
	featureFlags,
	explorer,
	meta: {
		// @TODO
		networkId: "d5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86",
	},
};

export default network;
