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
exports.AddressService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const lisk_cryptography_1 = require("@liskhq/lisk-cryptography");
const lisk_transactions_1 = require("@liskhq/lisk-transactions");
let AddressService = class AddressService extends platform_sdk_1.Services.AbstractAddressService {
	async fromMnemonic(mnemonic, options) {
		try {
			return { type: "bip39", address: lisk_cryptography_1.getAddressFromPassphrase(mnemonic) };
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async fromPublicKey(publicKey, options) {
		try {
			return { type: "bip39", address: lisk_cryptography_1.getAddressFromPublicKey(publicKey) };
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async validate(address) {
		try {
			lisk_transactions_1.utils.validateAddress(address);
			return true;
		} catch {
			return false;
		}
	}
};
AddressService = __decorate([platform_sdk_1.IoC.injectable()], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map
