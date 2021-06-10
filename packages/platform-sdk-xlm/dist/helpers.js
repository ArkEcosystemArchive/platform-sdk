"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveKeyPair = exports.buildPath = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const ed25519_hd_key_1 = require("ed25519-hd-key");
const stellar_sdk_1 = require("stellar-sdk");
const buildPath = (options) => {
	var _a;
	return `m/44'/148'/${
		((_a = options === null || options === void 0 ? void 0 : options.bip44) === null || _a === void 0
			? void 0
			: _a.account) || 0
	}'`;
};
exports.buildPath = buildPath;
const deriveKeyPair = (mnemonic, options) => {
	const path = exports.buildPath(options);
	const { key } = ed25519_hd_key_1.derivePath(path, platform_sdk_crypto_1.BIP39.toSeed(mnemonic).toString("hex"));
	return {
		child: stellar_sdk_1.Keypair.fromRawEd25519Seed(key),
		path,
	};
};
exports.deriveKeyPair = deriveKeyPair;
//# sourceMappingURL=helpers.js.map
