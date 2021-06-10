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
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _KeyPairService_instances, _KeyPairService_normalize;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPairService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const bitcoin = __importStar(require("bitcoinjs-lib"));
let KeyPairService = class KeyPairService extends platform_sdk_1.Services.AbstractKeyPairService {
	constructor() {
		super(...arguments);
		_KeyPairService_instances.add(this);
	}
	async fromMnemonic(mnemonic, options) {
		try {
			return __classPrivateFieldGet(this, _KeyPairService_instances, "m", _KeyPairService_normalize).call(
				this,
				bitcoin.ECPair.fromPrivateKey(platform_sdk_crypto_1.BIP32.fromMnemonic(mnemonic).privateKey),
			);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async fromPrivateKey(privateKey) {
		try {
			return __classPrivateFieldGet(this, _KeyPairService_instances, "m", _KeyPairService_normalize).call(
				this,
				bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, "hex")),
			);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async fromWIF(wif) {
		try {
			return __classPrivateFieldGet(this, _KeyPairService_instances, "m", _KeyPairService_normalize).call(
				this,
				bitcoin.ECPair.fromWIF(wif),
			);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
(_KeyPairService_instances = new WeakSet()),
	(_KeyPairService_normalize = function _KeyPairService_normalize(keyPair) {
		try {
			return {
				publicKey: keyPair.publicKey.toString("hex"),
				privateKey: keyPair.privateKey.toString("hex"),
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	});
KeyPairService = __decorate([platform_sdk_1.IoC.injectable()], KeyPairService);
exports.KeyPairService = KeyPairService;
//# sourceMappingURL=key-pair.service.js.map
