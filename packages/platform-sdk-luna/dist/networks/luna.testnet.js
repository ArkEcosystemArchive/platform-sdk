"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "luna.testnet",
	type: "test",
	name: "Testnet",
	coin: "Luna",
	currency: {
		ticker: "SOJU",
		symbol: "SOJU",
		decimals: 6,
	},
	constants: {
		slip44: 330,
	},
	hosts: [
		{
			type: "full",
			host: "https://soju-lcd.terra.dev",
		},
		{
			type: "explorer",
			host: "https://finder.terra.money/columbus-4",
		},
	],
	transactions: {
		...shared_1.transactions,
		fees: {
			type: "dynamic",
			ticker: "SOJU",
		},
	},
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
};
exports.default = network;
//# sourceMappingURL=luna.testnet.js.map
