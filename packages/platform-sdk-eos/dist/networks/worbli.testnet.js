"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "worbli.testnet",
	type: "test",
	name: "Testnet",
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
			host: "https://worbli-testnet.eosblocksmith.io",
		},
		{
			type: "full",
			host: "https://worbli-testnet.eosphere.io",
		},
		{
			type: "explorer",
			host: "https://worbli-test.bloks.io",
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
		networkId: "0d1ba39b44e70e9c36b74d60677ef3b686bd4347ade092b816886a6a35ddb6f7",
	},
};
exports.default = network;
//# sourceMappingURL=worbli.testnet.js.map
