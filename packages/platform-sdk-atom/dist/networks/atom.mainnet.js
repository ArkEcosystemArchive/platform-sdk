"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "atom.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Cosmos",
	currency: {
		ticker: "ATOM",
		symbol: "ATOM",
		decimals: 6,
	},
	constants: {
		slip44: 118,
		bech32: "cosmos",
	},
	hosts: [
		{
			type: "full",
			host: "https://node.atomscan.com",
		},
		{
			type: "explorer",
			host: "https://stake.id",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		// @TODO
		networkId: "cosmoshub-3",
	},
};
exports.default = network;
//# sourceMappingURL=atom.mainnet.js.map
