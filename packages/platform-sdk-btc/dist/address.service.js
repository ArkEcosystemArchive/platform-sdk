"use strict";
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				Object.defineProperty(o, k2, {
					enumerable: true,
					get: function () {
						return m[k];
					},
				});
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, "default", { enumerable: true, value: v });
		  }
		: function (o, v) {
				o["default"] = v;
		  });
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
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
	};
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var _AddressService_network;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const bitcoin = __importStar(require("bitcoinjs-lib"));
const constants_1 = require("./constants");
const address_factory_1 = require("./address.factory");
const helpers_1 = require("./helpers");
let AddressService = class AddressService extends platform_sdk_1.Services.AbstractAddressService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "addressFactory", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		_AddressService_network.set(this, void 0);
	}
	async fromMnemonic(mnemonic, options) {
		try {
			if (options === null || options === void 0 ? void 0 : options.bip44) {
				return this.addressFactory.bip44(mnemonic, options);
			}
			if (options === null || options === void 0 ? void 0 : options.bip49) {
				return this.addressFactory.bip49(mnemonic, options);
			}
			return this.addressFactory.bip84(mnemonic, options);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	// @TODO: support for bip44/49/84
	async fromMultiSignature(min, publicKeys) {
		try {
			const { address } = bitcoin.payments.p2sh({
				redeem: bitcoin.payments.p2ms({
					m: min,
					pubkeys: publicKeys.map((publicKey) => Buffer.from(publicKey, "hex")),
				}),
				network: __classPrivateFieldGet(this, _AddressService_network, "f"),
			});
			if (!address) {
				throw new Error(`Failed to derive address for [${publicKeys}].`);
			}
			return {
				type: "bip39",
				address: address.toString(),
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	// @TODO: support for bip44/49/84
	async fromPublicKey(publicKey, options) {
		try {
			const { address } = bitcoin.payments.p2pkh({
				pubkey: bitcoin.ECPair.fromPublicKey(Buffer.from(publicKey, "hex")).publicKey,
				network: __classPrivateFieldGet(this, _AddressService_network, "f"),
			});
			if (!address) {
				throw new Error(`Failed to derive address for [${publicKey}].`);
			}
			return {
				type: "bip39",
				address: address.toString(),
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	// @TODO: support for bip44/49/84
	async fromPrivateKey(privateKey, options) {
		try {
			const { address } = bitcoin.payments.p2pkh({
				pubkey: bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, "hex")).publicKey,
				network: __classPrivateFieldGet(this, _AddressService_network, "f"),
			});
			if (!address) {
				throw new Error(`Failed to derive address for [${privateKey}].`);
			}
			return {
				type: "bip39",
				address: address.toString(),
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	// @TODO: support for bip44/49/84
	async fromWIF(wif) {
		try {
			const { address } = bitcoin.payments.p2pkh({
				pubkey: bitcoin.ECPair.fromWIF(wif).publicKey,
				network: __classPrivateFieldGet(this, _AddressService_network, "f"),
			});
			if (!address) {
				throw new Error(`Failed to derive address for [${wif}].`);
			}
			return {
				type: "bip39",
				address,
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async validate(address) {
		return address !== undefined;
	}
	onPostConstruct() {
		__classPrivateFieldSet(this, _AddressService_network, helpers_1.getNetworkConfig(this.configRepository), "f");
	}
};
_AddressService_network = new WeakMap();
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ConfigRepository),
		__metadata("design:type", platform_sdk_1.Coins.ConfigRepository),
	],
	AddressService.prototype,
	"configRepository",
	void 0,
);
__decorate(
	[
		platform_sdk_1.IoC.inject(constants_1.BindingType.AddressFactory),
		__metadata("design:type", address_factory_1.AddressFactory),
	],
	AddressService.prototype,
	"addressFactory",
	void 0,
);
__decorate(
	[
		platform_sdk_1.IoC.postConstruct(),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0),
	],
	AddressService.prototype,
	"onPostConstruct",
	null,
);
AddressService = __decorate([platform_sdk_1.IoC.injectable()], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map
