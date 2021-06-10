"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "nano.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Nano",
	currency: {
		ticker: "NANO",
		symbol: "NANO",
		decimals: 30,
	},
	constants: {
		slip44: 165,
	},
	hosts: [
		{
			type: "full",
			host: "https://proxy.nanos.cc/proxy",
		},
		{
			type: "explorer",
			host: "https://nanocrawler.cc",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
};
exports.default = network;
//# sourceMappingURL=nano.mainnet.js.map
