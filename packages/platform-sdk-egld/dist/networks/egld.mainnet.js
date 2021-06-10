"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "egld.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Elrond",
	currency: {
		ticker: "EGLD",
		symbol: "EGLD",
		decimals: 18,
	},
	constants: {
		slip44: 508,
	},
	hosts: [
		{
			type: "full",
			host: "https://gateway.elrond.com",
		},
		{
			type: "explorer",
			host: "https://explorer.elrond.com",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
};
exports.default = network;
//# sourceMappingURL=egld.mainnet.js.map
