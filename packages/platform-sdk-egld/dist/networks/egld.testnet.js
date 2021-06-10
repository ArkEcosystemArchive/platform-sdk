"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "egld.testnet",
	type: "test",
	name: "Testnet",
	coin: "Elrond",
	currency: {
		ticker: "XeGLD",
		symbol: "XeGLD",
		decimals: 18,
	},
	constants: {
		slip44: 508,
	},
	hosts: [
		{
			type: "full",
			host: "https://testnet-gateway.elrond.com",
		},
		{
			type: "explorer",
			host: "https://testnet-explorer.elrond.com",
		},
	],
	transactions: {
		...shared_1.transactions,
		fees: {
			type: "static",
			ticker: "XeGLD",
		},
	},
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
};
exports.default = network;
//# sourceMappingURL=egld.testnet.js.map
