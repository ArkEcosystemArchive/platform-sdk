"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "bnb.mainnet",
	type: "live",
	name: "Mainnet",
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
			host: "https://bsc-dataseed1.binance.org:443",
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
//# sourceMappingURL=bnb.mainnet.js.map
