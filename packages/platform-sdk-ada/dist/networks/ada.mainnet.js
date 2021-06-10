"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "ada.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Cardano",
	currency: {
		ticker: "ADA",
		symbol: "ADA",
		decimals: 6,
	},
	constants: shared_1.constants,
	hosts: [
		{
			type: "explorer",
			host: "https://explorer.cardano.org",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		minFeeA: 44,
		minFeeB: 155381,
		minUTxOValue: 1000000,
		poolDeposit: 500000000,
		keyDeposit: 2000000,
		// @TODO
		networkId: "1",
		extendedPublicKey: true,
	},
};
exports.default = network;
//# sourceMappingURL=ada.mainnet.js.map
