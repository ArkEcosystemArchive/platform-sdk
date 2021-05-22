import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "dot.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Polkadot",
	currency: {
		ticker: "DOT",
		symbol: "DOT",
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
};

export default network;
