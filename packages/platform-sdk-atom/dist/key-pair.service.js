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
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPairService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const bcrypto_1 = require("bcrypto");
let KeyPairService = class KeyPairService extends platform_sdk_1.Services.AbstractKeyPairService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	async fromMnemonic(mnemonic, options) {
		var _a;
		try {
			const { child, path } = platform_sdk_crypto_1.BIP44.deriveChildWithPath(mnemonic, {
				coinType: this.configRepository.get(platform_sdk_1.Coins.ConfigKey.Slip44),
				index:
					(_a = options === null || options === void 0 ? void 0 : options.bip44) === null || _a === void 0
						? void 0
						: _a.addressIndex,
			});
			if (!child.privateKey) {
				throw new Error("Failed to derive private key.");
			}
			return {
				publicKey: bcrypto_1.secp256k1.publicKeyCreate(child.privateKey, true).toString("hex"),
				privateKey: child.privateKey.toString("hex"),
				path,
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ConfigRepository),
		__metadata("design:type", platform_sdk_1.Coins.ConfigRepository),
	],
	KeyPairService.prototype,
	"configRepository",
	void 0,
);
KeyPairService = __decorate([platform_sdk_1.IoC.injectable()], KeyPairService);
exports.KeyPairService = KeyPairService;
//# sourceMappingURL=key-pair.service.js.map
