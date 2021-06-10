"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "bind.testnet",
	type: "test",
	name: "Testnet",
	coin: "Compendia",
	currency: {
		ticker: "TBIND",
		symbol: "Tß",
		decimals: 8,
	},
	constants: {
		slip44: 1,
	},
	hosts: [
		{
			type: "full",
			host: "http://apis-testnet.compendia.org/api",
		},
		{
			type: "explorer",
			host: "https://testnet.bindscan.io",
		},
	],
	governance: {
		delegateCount: 47,
		votesPerWallet: 1,
		votesPerTransaction: 1,
	},
	transactions: {
		...shared_1.transactions,
		fees: {
			type: "dynamic",
			ticker: "TBIND",
		},
	},
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		fastDelegateSync: true,
	},
};
exports.default = network;
//# sourceMappingURL=bind.testnet.js.map
