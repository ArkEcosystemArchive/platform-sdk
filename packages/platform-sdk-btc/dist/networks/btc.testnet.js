"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "btc.testnet",
	type: "test",
	name: "Testnet",
	coin: "Bitcoin",
	currency: {
		ticker: "BTC",
		symbol: "Ƀ",
		decimals: 8,
	},
	constants: {
		slip44: 0,
	},
	hosts: [
		{
			type: "full",
			host: "https://coins.com/api/btc",
		},
		{
			type: "explorer",
			host: "https://blockstream.info/testnet",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
};
exports.default = network;
//# sourceMappingURL=btc.testnet.js.map
