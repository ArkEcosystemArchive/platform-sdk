"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "sol.testnet",
	type: "test",
	name: "Testnet",
	coin: "Solana",
	currency: {
		ticker: "SOL",
		symbol: "SOL",
		decimals: 9,
	},
	constants: {
		slip44: 501,
	},
	hosts: [
		{
			type: "full",
			host: "https://testnet.solana.com",
		},
		{
			type: "explorer",
			host: "https://explorer.solana.com",
			query: { cluster: "testnet" },
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
};
exports.default = network;
//# sourceMappingURL=sol.testnet.js.map
