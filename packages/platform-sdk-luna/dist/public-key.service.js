"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicKeyService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const helpers_1 = require("./helpers");
class PublicKeyService extends platform_sdk_1.Services.AbstractPublicKeyService {
	async fromMnemonic(mnemonic, options) {
		try {
			return { publicKey: helpers_1.deriveKey(mnemonic).publicKey.toString("hex") };
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
}
exports.PublicKeyService = PublicKeyService;
//# sourceMappingURL=public-key.service.js.map
