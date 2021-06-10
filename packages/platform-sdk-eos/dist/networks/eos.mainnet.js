"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "eos.mainnet",
	type: "live",
	name: "Mainnet",
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
			host: "https://eos.greymass.com",
		},
		{
			type: "full",
			host: "https://api.eosn.io",
		},
		{
			type: "full",
			host: "https://mainnet.genereos.io",
		},
		{
			type: "explorer",
			host: "https://eos.bloks.io",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		// @TODO
		networkId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
	},
};
exports.default = network;
//# sourceMappingURL=eos.mainnet.js.map
