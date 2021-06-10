"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "avax.testnet",
	type: "live",
	name: "Testnet",
	coin: "Avalanche",
	currency: {
		ticker: "FUJI",
		symbol: "FUJI",
		decimals: 9,
	},
	constants: {
		slip44: 9000,
	},
	hosts: [
		{
			type: "full",
			host: "https://api.avax-test.network:443",
		},
		{
			type: "archival",
			host: "https://api.avax-test.network:8080",
		},
		{
			type: "explorer",
			host: "https://explorer.avax-test.network",
		},
	],
	transactions: {
		...shared_1.transactions,
		fees: {
			type: "static",
			ticker: "FUJI",
		},
	},
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		// @TODO
		networkId: "5",
		blockchainId: "2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm",
		assetId: "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK",
	},
};
exports.default = network;
//# sourceMappingURL=avax.testnet.js.map
