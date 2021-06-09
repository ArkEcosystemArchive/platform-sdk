import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, transactions, importMethods, featureFlags } from "./shared";

const network: Networks.NetworkManifest = {
	id: "ark.devnet",
	type: "test",
	name: "Devnet",
	coin: "ARK",
	currency: {
		ticker: "DARK",
		symbol: "DѦ",
		decimals: 8,
	},
	constants: {
		slip44: 1,
	},
	hosts: [
		{
			type: "full",
			host: "https://dwallets.ark.io/api",
		},
		{
			type: "musig",
			host: "https://dmusig1.ark.io",
		},
		{
			type: "explorer",
			host: "https://dexplorer.ark.io",
		},
	],
	governance: {
		delegateCount: 51,
		votesPerWallet: 1,
		votesPerTransaction: 1,
	},
	transactions: {
		...transactions,
		fees: {
			type: "dynamic",
			ticker: "DARK",
		},
	},
	importMethods,
	featureFlags,
	explorer,
	knownWallets: "https://raw.githubusercontent.com/ArkEcosystem/common/master/devnet/known-wallets-extended.json",
	meta: {
		fastDelegateSync: true,
	},
};

export default network;
