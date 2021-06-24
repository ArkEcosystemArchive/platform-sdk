import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

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
			// host: "https://dmusig1.ark.io",
			host: "http://0.0.0.0:3000",
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
		multiPaymentRecipients: 128,
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
