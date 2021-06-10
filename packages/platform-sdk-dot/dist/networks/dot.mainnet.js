"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "dot.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Polkadot",
	currency: {
		ticker: "DOT",
		symbol: "DOT",
		decimals: 10,
	},
	constants: {
		slip44: 354,
	},
	hosts: [
		{
			type: "full",
			host: "https://rpc.polkadot.io/",
		},
		{
			type: "explorer",
			host: "https://polkascan.io/polkadot",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		networkId: "0",
	},
};
exports.default = network;
//# sourceMappingURL=dot.mainnet.js.map
