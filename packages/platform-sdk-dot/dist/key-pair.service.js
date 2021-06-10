"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
			d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPairService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const util_1 = require("@polkadot/util");
const util_crypto_1 = require("@polkadot/util-crypto");
let KeyPairService = class KeyPairService extends platform_sdk_1.Services.AbstractKeyPairService {
	async fromMnemonic(mnemonic, options) {
		const { publicKey, secretKey } = util_crypto_1.naclKeypairFromSeed(
			util_crypto_1.mnemonicToMiniSecret(mnemonic),
		);
		return { publicKey: util_1.u8aToHex(publicKey), privateKey: util_1.u8aToHex(secretKey) };
	}
};
KeyPairService = __decorate([platform_sdk_1.IoC.injectable()], KeyPairService);
exports.KeyPairService = KeyPairService;
//# sourceMappingURL=key-pair.service.js.map
