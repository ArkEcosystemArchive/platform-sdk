import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, transactions, importMethods, featureFlags } from "./shared";

const network: Networks.NetworkManifest = {
	id: "ark.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "ARK",
	currency: {
		ticker: "ARK",
		symbol: "Ѧ",
		decimals: 8,
	},
	constants: {
		slip44: 111,
	},
	hosts: [
		{
			type: "full",
			host: "https://wallets.ark.io/api",
		},
		{
			type: "musig",
			host: "https://musig1.ark.io",
		},
		{
			type: "explorer",
			host: "https://explorer.ark.io",
		},
	],
	governance: {
		delegateCount: 51,
		votesPerWallet: 1,
		votesPerTransaction: 1,
	},
	transactions,
	importMethods,
	featureFlags,
	explorer,
	knownWallets: "https://raw.githubusercontent.com/ArkEcosystem/common/master/mainnet/known-wallets-extended.json",
	meta: {
		fastDelegateSync: true,
	},
};

export default network;
