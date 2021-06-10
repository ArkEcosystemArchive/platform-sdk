"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseSchema = exports.useLogger = exports.makeCoin = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_ark_1 = require("@arkecosystem/platform-sdk-ark");
const platform_sdk_http_got_1 = require("@arkecosystem/platform-sdk-http-got");
const joi_1 = __importDefault(require("joi"));
const coins = {};
const makeCoin = async (input) => {
	const cacheKey = `${input.coin}.${input.network}`;
	if (coins[cacheKey]) {
		return coins[cacheKey];
	}
	coins[cacheKey] = platform_sdk_1.Coins.CoinFactory.make({ ARK: platform_sdk_ark_1.ARK }[input.coin], {
		network: input.network,
		httpClient: new platform_sdk_http_got_1.Request(),
	});
	await coins[cacheKey].__construct();
	delete input.coin;
	delete input.network;
	return coins[cacheKey];
};
exports.makeCoin = makeCoin;
const useLogger = () => console;
exports.useLogger = useLogger;
exports.baseSchema = {
	coin: joi_1.default.string().required(),
	network: joi_1.default.string().required(),
};
//# sourceMappingURL=helpers.js.map
