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
exports.PrivateKeyService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
let PrivateKeyService = class PrivateKeyService extends platform_sdk_1.Services.AbstractPrivateKeyService {
	async fromMnemonic(mnemonic, options) {
		try {
			return { privateKey: platform_sdk_crypto_1.BIP32.fromMnemonic(mnemonic).privateKey.toString("hex") };
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async fromWIF(wif) {
		try {
			const { privateKey } = bitcoinjs_lib_1.ECPair.fromWIF(wif);
			if (!privateKey) {
				throw new Error(`Failed to derive private key for [${wif}].`);
			}
			return { privateKey: privateKey.toString("hex") };
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
PrivateKeyService = __decorate([platform_sdk_1.IoC.injectable()], PrivateKeyService);
exports.PrivateKeyService = PrivateKeyService;
//# sourceMappingURL=private-key.service.js.map
