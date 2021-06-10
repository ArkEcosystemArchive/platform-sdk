"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashAlgorithms = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const bcrypto_1 = require("bcrypto");
class HashAlgorithms {
	static ripemd160(buffer) {
		return bcrypto_1.RIPEMD160.digest(platform_sdk_crypto_1.Buffoon.make(buffer));
	}
	static sha256(buffer) {
		if (Array.isArray(buffer)) {
			let sha256 = bcrypto_1.SHA256.ctx;
			sha256.init();
			for (const element of buffer) {
				sha256 = sha256.update(element);
			}
			return sha256.final();
		}
		return bcrypto_1.SHA256.digest(platform_sdk_crypto_1.Buffoon.make(buffer));
	}
}
exports.HashAlgorithms = HashAlgorithms;
//# sourceMappingURL=hash.js.map
