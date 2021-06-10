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
const helpers_1 = require("./helpers");
let KeyPairService = class KeyPairService extends platform_sdk_1.Services.AbstractKeyPairService {
	async fromMnemonic(mnemonic, options) {
		var _a;
		try {
			const { publicKey, privateKey } = helpers_1.deriveAccount(
				mnemonic,
				(_a = options === null || options === void 0 ? void 0 : options.bip44) === null || _a === void 0
					? void 0
					: _a.account,
			);
			return { publicKey, privateKey };
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
KeyPairService = __decorate([platform_sdk_1.IoC.injectable()], KeyPairService);
exports.KeyPairService = KeyPairService;
//# sourceMappingURL=key-pair.service.js.map
