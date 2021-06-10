"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "xrp.testnet",
	type: "test",
	name: "Testnet",
	coin: "XRP",
	currency: {
		ticker: "XRP",
		symbol: "XRP",
		decimals: 6,
	},
	constants: {
		slip44: 144,
	},
	hosts: [
		{
			type: "full",
			host: "https://s.altnet.rippletest.net:51234/",
		},
		{
			type: "explorer",
			host: "https://testnet.xrpl.org",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
};
exports.default = network;
//# sourceMappingURL=xrp.testnet.js.map
