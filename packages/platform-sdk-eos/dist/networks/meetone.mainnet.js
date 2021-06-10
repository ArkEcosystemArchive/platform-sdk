"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "meetone.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "MEET.ONE",
	currency: {
		ticker: "MEETONE",
		symbol: "MEETONE",
		decimals: 4,
	},
	constants: {
		slip44: 194,
		bech32: "MEETONE",
	},
	hosts: [
		{
			type: "full",
			host: "https://fullnode.meet.one",
		},
		{
			type: "explorer",
			host: "https://meetone.bloks.io",
		},
	],
	transactions: {
		...shared_1.transactions,
		fees: {
			type: "free",
			ticker: "MEETONE",
		},
	},
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		// @TODO
		networkId: "cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422",
	},
};
exports.default = network;
//# sourceMappingURL=meetone.mainnet.js.map
