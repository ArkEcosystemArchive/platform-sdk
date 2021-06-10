"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "xlm.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Stellar",
	currency: {
		ticker: "XLM",
		symbol: "XLM",
		decimals: 7,
	},
	constants: {
		slip44: 148,
	},
	hosts: [
		{
			type: "full",
			host: "https://horizon.stellar.org",
		},
		{
			type: "explorer",
			host: "https://steexp.com",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
};
exports.default = network;
//# sourceMappingURL=xlm.mainnet.js.map
