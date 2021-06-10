"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "worbli.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Worbli",
	currency: {
		ticker: "WBI",
		symbol: "WBI",
		decimals: 4,
	},
	constants: {
		slip44: 194,
		bech32: "WBI",
	},
	hosts: [
		{
			type: "full",
			host: "https://api.worbli.io",
		},
		{
			type: "full",
			host: "https://worbli-mainnet.eosblocksmith.io",
		},
		{
			type: "explorer",
			host: "https://worbli.bloks.io",
		},
	],
	transactions: {
		...shared_1.transactions,
		fees: {
			type: "free",
			ticker: "WBI",
		},
	},
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		// @TODO
		networkId: "73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f",
	},
};
exports.default = network;
//# sourceMappingURL=worbli.mainnet.js.map
