import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "ark.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "ARK",
	currency: {
		ticker: "ARK",
		symbol: "Ѧ",
	},
	constants: {
		slip44: 111,
	},
	hosts: [
		{
			type: "full",
			host: { url: "https://wallets.ark.io" },
		},
		{
			type: "musig",
			host: { url: "https://musig1.ark.io" },
		},
		{
			type: "explorer",
			host: { url: "https://explorer.ark.io/" },
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
	knownWallets: "https://raw.githubusercontent.com/ArkEcosystem/common/master/mainnet/known-wallets-extended.json",
};

export default network;
