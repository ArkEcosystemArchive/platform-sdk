"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPairService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const helpers_1 = require("./helpers");
class KeyPairService extends platform_sdk_1.Services.AbstractKeyPairService {
	async fromMnemonic(mnemonic, options) {
		try {
			const accountKey = helpers_1.deriveKey(mnemonic);
			return {
				publicKey: accountKey.publicKey.toString("hex"),
				privateKey: accountKey.privateKey.toString("hex"),
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
}
exports.KeyPairService = KeyPairService;
//# sourceMappingURL=key-pair.service.js.map
