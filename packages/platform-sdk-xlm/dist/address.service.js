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
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const stellar_sdk_1 = __importDefault(require("stellar-sdk"));
const helpers_1 = require("./helpers");
let AddressService = class AddressService extends platform_sdk_1.Services.AbstractAddressService {
	async fromMnemonic(mnemonic, options) {
		try {
			const { child, path } = helpers_1.deriveKeyPair(mnemonic, options);
			return {
				type: "bip44",
				address: child.publicKey(),
				path,
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async fromPrivateKey(privateKey, options) {
		try {
			return {
				type: "bip44",
				address: stellar_sdk_1.default.Keypair.fromSecret(privateKey).publicKey(),
				path: helpers_1.buildPath(options),
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async validate(address) {
		return true;
	}
};
AddressService = __decorate([platform_sdk_1.IoC.injectable()], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map
