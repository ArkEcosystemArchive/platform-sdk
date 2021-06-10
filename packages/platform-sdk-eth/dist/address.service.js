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
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const ethereumjs_wallet_1 = __importDefault(require("ethereumjs-wallet"));
const utils_1 = require("./utils");
let AddressService = class AddressService extends platform_sdk_1.Services.AbstractAddressService {
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
		var _a, _b, _c;
		try {
			return {
				type: "bip44",
				address: utils_1.getAddress(
					utils_1.createWallet(
						mnemonic,
						this.configRepository.get(platform_sdk_1.Coins.ConfigKey.Slip44),
						((_a = options === null || options === void 0 ? void 0 : options.bip44) === null ||
						_a === void 0
							? void 0
							: _a.account) || 0,
						((_b = options === null || options === void 0 ? void 0 : options.bip44) === null ||
						_b === void 0
							? void 0
							: _b.change) || 0,
						((_c = options === null || options === void 0 ? void 0 : options.bip44) === null ||
						_c === void 0
							? void 0
							: _c.addressIndex) || 0,
					),
				),
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async fromPublicKey(publicKey, options) {
		try {
			return {
				type: "bip44",
				address: utils_1.getAddress(
					ethereumjs_wallet_1.default.fromPublicKey(platform_sdk_crypto_1.Buffoon.fromHex(publicKey)),
				),
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async fromPrivateKey(privateKey, options) {
		try {
			return {
				type: "bip44",
				address: utils_1.getAddress(
					ethereumjs_wallet_1.default.fromPrivateKey(platform_sdk_crypto_1.Buffoon.fromHex(privateKey)),
				),
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async validate(address) {
		return address !== undefined;
	}
};
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ConfigRepository),
		__metadata("design:type", platform_sdk_1.Coins.ConfigRepository),
	],
	AddressService.prototype,
	"configRepository",
	void 0,
);
AddressService = __decorate([platform_sdk_1.IoC.injectable()], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map
