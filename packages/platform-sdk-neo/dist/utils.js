"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveKeyPair = exports.deriveWallet = exports.createWallet = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const neon_js_1 = require("@cityofzion/neon-js");
const createWallet = (input) => new neon_js_1.wallet.Account(input);
exports.createWallet = createWallet;
const deriveWallet = (mnemonic, coinType, account, change, index) => {
	const privateKey = platform_sdk_crypto_1.BIP44.deriveChild(mnemonic, {
		coinType,
		account,
		change,
		index,
	}).privateKey.toString("hex");
	return exports.createWallet(privateKey);
};
exports.deriveWallet = deriveWallet;
const deriveKeyPair = (input) => {
	const { publicKey, privateKey } = exports.createWallet(input);
	return { publicKey, privateKey };
};
exports.deriveKeyPair = deriveKeyPair;
//# sourceMappingURL=utils.js.map
