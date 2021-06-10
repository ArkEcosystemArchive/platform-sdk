"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
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
		...shared_1.transactions,
		fees: {
			type: "dynamic",
			ticker: "DARK",
		},
	},
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	knownWallets: "https://raw.githubusercontent.com/ArkEcosystem/common/master/devnet/known-wallets-extended.json",
	meta: {
		fastDelegateSync: true,
	},
};
exports.default = network;
//# sourceMappingURL=ark.devnet.js.map
