"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "neo.testnet",
	type: "test",
	name: "Testnet",
	coin: "NEO",
	currency: {
		ticker: "NEO",
		symbol: "NEO",
		decimals: 8,
	},
	constants: {
		slip44: 888,
	},
	hosts: [
		{
			type: "full",
			host: "https://testnet1.neo2.coz.io:443",
		},
		{
			type: "full",
			host: "https://testnet2.neo2.coz.io:443",
		},
		{
			type: "full",
			host: "https://testnet3.neo2.coz.io:443",
		},
		{
			type: "full",
			host: "http://seed1.ngd.network:20332",
		},
		{
			type: "full",
			host: "http://seed2.ngd.network:20332",
		},
		{
			type: "explorer",
			host: "https://neoscan-testnet.io",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
};
exports.default = network;
//# sourceMappingURL=neo.testnet.js.map
