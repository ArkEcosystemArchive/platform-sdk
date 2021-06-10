"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
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
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	knownWallets: "https://raw.githubusercontent.com/ArkEcosystem/common/master/mainnet/known-wallets-extended.json",
	meta: {
		fastDelegateSync: true,
	},
};
exports.default = network;
//# sourceMappingURL=ark.mainnet.js.map
