"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "telos.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Telos",
	currency: {
		ticker: "TLOS",
		symbol: "TLOS",
		decimals: 4,
	},
	constants: {
		slip44: 194,
		bech32: "TLOS",
	},
	hosts: [
		{
			type: "full",
			host: "https://apinode.telosgermany.io",
		},
		{
			type: "full",
			host: "https://api.telosfoundation.io",
		},
		{
			type: "full",
			host: "https://telos-mainnet.eosblocksmith.io",
		},
		{
			type: "full",
			host: "https://telos.caleos.io",
		},
		{
			type: "explorer",
			host: "https://telos.bloks.io",
		},
	],
	transactions: {
		...shared_1.transactions,
		fees: {
			type: "free",
			ticker: "TLOS",
		},
	},
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		// @TODO
		networkId: "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11",
	},
};
exports.default = network;
//# sourceMappingURL=telos.mainnet.js.map
