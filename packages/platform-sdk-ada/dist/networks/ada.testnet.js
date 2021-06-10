"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "ada.testnet",
	type: "test",
	name: "Testnet",
	coin: "Cardano",
	currency: {
		ticker: "ADA",
		symbol: "ADA",
		decimals: 6,
	},
	constants: shared_1.constants,
	hosts: [
		{
			type: "full",
			host: "http://51.75.183.27:3100",
		},
		{
			type: "explorer",
			host: "https://shelleyexplorer.cardano.org",
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
		networkId: "0",
		extendedPublicKey: true,
	},
};
exports.default = network;
//# sourceMappingURL=ada.testnet.js.map
