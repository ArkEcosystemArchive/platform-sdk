"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "zil.testnet",
	type: "test",
	name: "Testnet",
	coin: "Zilliqa",
	currency: {
		ticker: "ZIL",
		symbol: "ZIL",
		decimals: 12,
	},
	constants: {
		slip44: 313,
	},
	hosts: [
		{
			type: "full",
			host: "https://dev-api.zilliqa.com",
		},
		{
			type: "explorer",
			host: "https://viewblock.io/zilliqa",
			query: { network: "testnet" },
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
};
exports.default = network;
//# sourceMappingURL=zil.testnet.js.map
