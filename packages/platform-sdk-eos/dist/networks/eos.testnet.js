"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "eos.testnet",
	type: "test",
	name: "Testnet",
	coin: "EOS",
	currency: {
		ticker: "EOS",
		symbol: "EOS",
		decimals: 4,
	},
	constants: {
		slip44: 194,
		bech32: "EOS",
	},
	hosts: [
		{
			type: "full",
			host: "https://api.testnet.eos.io",
		},
		{
			type: "explorer",
			host: "https://eos-test.bloks.io",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		// @TODO
		networkId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
	},
};
exports.default = network;
//# sourceMappingURL=eos.testnet.js.map
