"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "ksm.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Kusama",
	currency: {
		ticker: "KSM",
		symbol: "KSM",
		decimals: 12,
	},
	constants: {
		slip44: 434,
	},
	hosts: [
		{
			type: "full",
			host: "https://kusama-rpc.polkadot.io/",
		},
		{
			type: "explorer",
			host: "https://polkascan.io/kusama",
		},
	],
	transactions: {
		...shared_1.transactions,
		fees: {
			type: "weight",
			ticker: "KSM",
		},
	},
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		networkId: "2",
	},
};
exports.default = network;
//# sourceMappingURL=ksm.mainnet.js.map
