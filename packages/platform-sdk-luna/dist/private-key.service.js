"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateKeyService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const helpers_1 = require("./helpers");
class PrivateKeyService extends platform_sdk_1.Services.AbstractPrivateKeyService {
	async fromMnemonic(mnemonic, options) {
		try {
			return { privateKey: helpers_1.deriveKey(mnemonic).privateKey.toString("hex") };
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
}
exports.PrivateKeyService = PrivateKeyService;
//# sourceMappingURL=private-key.service.js.map
