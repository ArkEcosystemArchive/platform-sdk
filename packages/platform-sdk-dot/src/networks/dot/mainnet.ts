import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "dot.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Polkadot",
	currency: {
		ticker: "DOT",
		symbol: "DOT",
		decimals: 10,
	},
	constants: {
		slip44: 354,
	},
	hosts: [
		{
			type: "full",
			host: "https://rpc.polkadot.io/",
		},
		{
			type: "explorer",
			host: "https://polkascan.io/polkadot",
		},
	],
	transactions,
	importMethods,
	featureFlags,
	explorer,
	meta: {
		networkId: "0",
	},
};

export default network;
