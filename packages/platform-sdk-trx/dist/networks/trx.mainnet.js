"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "trx.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "TRON",
	currency: {
		ticker: "TRX",
		symbol: "TRX",
		decimals: 6,
	},
	constants: {
		slip44: 195,
	},
	hosts: [
		{
			type: "full",
			host: "https://api.trongrid.io",
		},
		{
			type: "explorer",
			host: "https://tronscan.org/#",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
};
exports.default = network;
//# sourceMappingURL=trx.mainnet.js.map
