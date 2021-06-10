"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "bind.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Compendia",
	currency: {
		ticker: "BIND",
		symbol: "ß",
		decimals: 8,
	},
	constants: {
		slip44: 543,
	},
	hosts: [
		{
			type: "full",
			host: "https://apis.compendia.org/api",
		},
		{
			type: "explorer",
			host: "https://bindscan.io",
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
			ticker: "BIND",
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
//# sourceMappingURL=bind.mainnet.js.map
