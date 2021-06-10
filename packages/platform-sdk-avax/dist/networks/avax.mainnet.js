"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "avax.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Avalanche",
	currency: {
		ticker: "AVAX",
		symbol: "AVAX",
		decimals: 9,
	},
	constants: {
		slip44: 9000,
	},
	hosts: [
		{
			type: "full",
			host: "https://api.avax.network:443",
		},
		{
			type: "archival",
			host: "https://api.avax.network:8080",
		},
		{
			type: "explorer",
			host: "https://explorer.avax.network",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		// @TODO
		networkId: "1",
		blockchainId: "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
		assetId: "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
	},
};
exports.default = network;
//# sourceMappingURL=avax.mainnet.js.map
