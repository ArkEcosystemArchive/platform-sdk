"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "bos.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "BOSCore",
	currency: {
		ticker: "BOS",
		symbol: "BOS",
		decimals: 4,
	},
	constants: {
		slip44: 194,
		bech32: "BOS",
	},
	hosts: [
		{
			type: "full",
			host: "https://api.boscore.io",
		},
		{
			type: "explorer",
			host: "https://bos.bloks.io",
		},
	],
	transactions: {
		...shared_1.transactions,
		fees: {
			type: "free",
			ticker: "BOS",
		},
	},
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		// @TODO
		networkId: "d5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86",
	},
};
exports.default = network;
//# sourceMappingURL=bos.mainnet.js.map
