"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const network = {
	id: "lsk.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Lisk",
	currency: {
		ticker: "LSK",
		symbol: "LSK",
		decimals: 8,
	},
	constants: {
		slip44: 134,
	},
	hosts: [
		{
			type: "full",
			host: "https://hub21.lisk.io",
		},
		{
			type: "full",
			host: "https://hub22.lisk.io",
		},
		{
			type: "full",
			host: "https://hub23.lisk.io",
		},
		{
			type: "full",
			host: "https://hub24.lisk.io",
		},
		{
			type: "full",
			host: "https://hub25.lisk.io",
		},
		{
			type: "full",
			host: "https://hub26.lisk.io",
		},
		{
			type: "full",
			host: "https://hub27.lisk.io",
		},
		{
			type: "full",
			host: "https://hub28.lisk.io",
		},
		{
			type: "full",
			host: "https://hub31.lisk.io",
		},
		{
			type: "full",
			host: "https://hub32.lisk.io",
		},
		{
			type: "full",
			host: "https://hub33.lisk.io",
		},
		{
			type: "full",
			host: "https://hub34.lisk.io",
		},
		{
			type: "full",
			host: "https://hub35.lisk.io",
		},
		{
			type: "full",
			host: "https://hub36.lisk.io",
		},
		{
			type: "full",
			host: "https://hub37.lisk.io",
		},
		{
			type: "full",
			host: "https://hub38.lisk.io",
		},
		{
			type: "explorer",
			host: "https://explorer.lisk.io",
		},
	],
	governance: {
		delegateCount: 101,
		votesPerWallet: 101,
		votesPerTransaction: 33,
	},
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	meta: {
		// @TODO
		networkId: "ed14889723f24ecc54871d058d98ce91ff2f973192075c0155ba2b7b70ad2511",
	},
};
exports.default = network;
//# sourceMappingURL=lsk.mainnet.js.map
