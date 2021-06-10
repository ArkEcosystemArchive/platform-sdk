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
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _AddressFactory_instances, _AddressFactory_network, _AddressFactory_derive;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressFactory = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const bitcoin = __importStar(require("bitcoinjs-lib"));
const helpers_1 = require("./helpers");
let AddressFactory = class AddressFactory {
	constructor() {
		_AddressFactory_instances.add(this);
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		_AddressFactory_network.set(this, void 0);
	}
	onPostConstruct() {
		__classPrivateFieldSet(this, _AddressFactory_network, helpers_1.getNetworkConfig(this.configRepository), "f");
	}
	bip44(mnemonic, options) {
		var _a, _b;
		const levels = {
			coinType: this.configRepository.get(platform_sdk_1.Coins.ConfigKey.Slip44),
			account:
				(_a = options === null || options === void 0 ? void 0 : options.bip44) === null || _a === void 0
					? void 0
					: _a.account,
			index:
				(_b = options === null || options === void 0 ? void 0 : options.bip44) === null || _b === void 0
					? void 0
					: _b.addressIndex,
		};
		return __classPrivateFieldGet(this, _AddressFactory_instances, "m", _AddressFactory_derive).call(
			this,
			"bip44",
			levels,
			bitcoin.payments.p2pkh({
				pubkey: platform_sdk_crypto_1.BIP44.deriveChild(mnemonic, levels).publicKey,
				network: __classPrivateFieldGet(this, _AddressFactory_network, "f"),
			}),
		);
	}
	bip49(mnemonic, options) {
		var _a, _b;
		const levels = {
			purpose: 49,
			coinType: this.configRepository.get(platform_sdk_1.Coins.ConfigKey.Slip44),
			account:
				(_a = options === null || options === void 0 ? void 0 : options.bip49) === null || _a === void 0
					? void 0
					: _a.account,
			index:
				(_b = options === null || options === void 0 ? void 0 : options.bip49) === null || _b === void 0
					? void 0
					: _b.addressIndex,
		};
		return __classPrivateFieldGet(this, _AddressFactory_instances, "m", _AddressFactory_derive).call(
			this,
			"bip49",
			levels,
			bitcoin.payments.p2sh({
				redeem: bitcoin.payments.p2wpkh({
					pubkey: platform_sdk_crypto_1.BIP44.deriveChild(mnemonic, levels).publicKey,
					network: __classPrivateFieldGet(this, _AddressFactory_network, "f"),
				}),
				network: __classPrivateFieldGet(this, _AddressFactory_network, "f"),
			}),
		);
	}
	bip84(mnemonic, options) {
		var _a, _b;
		const levels = {
			purpose: 84,
			coinType: this.configRepository.get(platform_sdk_1.Coins.ConfigKey.Slip44),
			account:
				(_a = options === null || options === void 0 ? void 0 : options.bip84) === null || _a === void 0
					? void 0
					: _a.account,
			index:
				(_b = options === null || options === void 0 ? void 0 : options.bip84) === null || _b === void 0
					? void 0
					: _b.addressIndex,
		};
		return __classPrivateFieldGet(this, _AddressFactory_instances, "m", _AddressFactory_derive).call(
			this,
			"bip84",
			levels,
			bitcoin.payments.p2wpkh({
				pubkey: platform_sdk_crypto_1.BIP44.deriveChild(mnemonic, levels).publicKey,
				network: __classPrivateFieldGet(this, _AddressFactory_network, "f"),
			}),
		);
	}
};
(_AddressFactory_network = new WeakMap()),
	(_AddressFactory_instances = new WeakSet()),
	(_AddressFactory_derive = function _AddressFactory_derive(type, levels, payment) {
		const { address } = payment;
		if (!address) {
			throw new Error("Failed to derive an address.");
		}
		return { type, address, path: platform_sdk_crypto_1.BIP44.stringify(levels) };
	});
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ConfigRepository),
		__metadata("design:type", platform_sdk_1.Coins.ConfigRepository),
	],
	AddressFactory.prototype,
	"configRepository",
	void 0,
);
__decorate(
	[
		platform_sdk_1.IoC.postConstruct(),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0),
	],
	AddressFactory.prototype,
	"onPostConstruct",
	null,
);
AddressFactory = __decorate([platform_sdk_1.IoC.injectable()], AddressFactory);
exports.AddressFactory = AddressFactory;
//# sourceMappingURL=address.factory.js.map
