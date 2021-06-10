"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyPairFromMnemonic = exports.cb58Encode = exports.cb58Decode = exports.useKeychain = exports.usePChain = exports.useXChain = exports.useInfo = exports.useAvalanche = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const avalanche_1 = require("avalanche");
const hdkey_1 = __importDefault(require("hdkey"));
const url_parse_lax_1 = __importDefault(require("url-parse-lax"));
const useAvalanche = (config) => {
	const { hostname: host, port, protocol } = url_parse_lax_1.default(
		platform_sdk_1.Helpers.randomHostFromConfig(config),
	);
	return new avalanche_1.Avalanche(
		host,
		port,
		protocol.replace(":", ""),
		parseInt(config.get("network.meta.networkId")),
		config.get("network.meta.blockchainId"),
	);
};
exports.useAvalanche = useAvalanche;
const useInfo = (config) => exports.useAvalanche(config).Info();
exports.useInfo = useInfo;
const useXChain = (config) => exports.useAvalanche(config).XChain();
exports.useXChain = useXChain;
const usePChain = (config) => exports.useAvalanche(config).PChain();
exports.usePChain = usePChain;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useKeychain = (config) => exports.useXChain(config).keyChain();
exports.useKeychain = useKeychain;
const cb58Decode = (value) => avalanche_1.BinTools.getInstance().cb58Decode(value);
exports.cb58Decode = cb58Decode;
const cb58Encode = (value) => avalanche_1.BinTools.getInstance().cb58Encode(value);
exports.cb58Encode = cb58Encode;
// Crypto
const keyPairFromMnemonic = (config, mnemonic, options) => {
	var _a, _b;
	const path = platform_sdk_crypto_1.BIP44.stringify({
		coinType: config.get(platform_sdk_1.Coins.ConfigKey.Slip44),
		account:
			(_a = options === null || options === void 0 ? void 0 : options.bip44) === null || _a === void 0
				? void 0
				: _a.account,
		index:
			(_b = options === null || options === void 0 ? void 0 : options.bip44) === null || _b === void 0
				? void 0
				: _b.addressIndex,
	});
	return {
		child: exports.useKeychain(config).importKey(
			// @ts-ignore
			hdkey_1.default.fromMasterSeed(platform_sdk_crypto_1.BIP39.toSeed(mnemonic)).derive(path).privateKey,
		),
		path,
	};
};
exports.keyPairFromMnemonic = keyPairFromMnemonic;
//# sourceMappingURL=helpers.js.map
