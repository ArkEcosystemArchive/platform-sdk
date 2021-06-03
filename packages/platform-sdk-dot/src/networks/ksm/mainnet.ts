import { Networks } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "ksm.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Kusama",
	currency: {
		ticker: "KSM",
		symbol: "KSM",
		decimals: 12,
	},
	constants: {
		slip44: 434,
	},
	hosts: [
		{
			type: "full",
			host: "https://kusama-rpc.polkadot.io/",
		},
		{
			type: "explorer",
			host: "https://polkascan.io/kusama",
		},
	],
	transactions: {
		...transactions,
		...{
			fees: {
				type: "weight",
				ticker: "KSM",
			},
		},
	},
	importMethods,
	featureFlags,
	meta: {
		networkId: "2",
	},
};

export default network;
