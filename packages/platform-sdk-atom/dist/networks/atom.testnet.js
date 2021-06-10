"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "atom.testnet",
	type: "test",
	name: "Testnet",
	coin: "Cosmos",
	currency: {
		ticker: "MUON",
		symbol: "MUON",
		decimals: 6,
	},
	constants: {
		slip44: 118,
		bech32: "cosmos",
	},
	hosts: [
		{
			type: "full",
			host: "https://stargate.cosmos.network",
		},
		{
			type: "explorer",
			host: "https://gaia.stake.id",
		},
	],
	transactions: {
		...shared_1.transactions,
		fees: {
			type: "static",
			ticker: "MUON",
		},
	},
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		// @TODO
		networkId: "gaia-13007",
	},
};
exports.default = network;
//# sourceMappingURL=atom.testnet.js.map
