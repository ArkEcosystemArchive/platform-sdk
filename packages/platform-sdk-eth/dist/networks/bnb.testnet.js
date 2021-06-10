"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "bnb.testnet",
	type: "test",
	name: "Testnet",
	coin: "Binance",
	currency: {
		ticker: "BNB",
		symbol: "BNB",
		decimals: 18,
	},
	constants: {
		slip44: 714,
	},
	hosts: [
		{
			type: "full",
			host: "https://data-seed-prebsc-1-s1.binance.org:8545",
		},
		{
			type: "explorer",
			host: "https://binance.mintscan.io",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
};
exports.default = network;
//# sourceMappingURL=bnb.testnet.js.map
