"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const eth_mainnet_tokens_json_1 = __importDefault(require("./eth.mainnet.tokens.json"));
const shared_1 = require("./shared");
const network = {
	id: "eth.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Ethereum",
	currency: {
		ticker: "ETH",
		symbol: "Ξ",
		decimals: 18,
	},
	constants: {
		slip44: 60,
	},
	hosts: [
		{
			type: "full",
			host: "https://platform.ark.io/api/eth",
		},
		{
			type: "explorer",
			host: "https://etherscan.io",
		},
	],
	transactions: shared_1.transactions,
	importMethods: shared_1.importMethods,
	featureFlags: shared_1.featureFlags,
	explorer: shared_1.explorer,
	tokens: eth_mainnet_tokens_json_1.default,
	meta: {
		// @TODO
		networkId: "1",
	},
};
exports.default = network;
//# sourceMappingURL=eth.mainnet.js.map
