"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const bech32_1 = require("bech32");
const helpers_1 = require("./helpers");
class AddressService extends platform_sdk_1.Services.AbstractAddressService {
	async fromMnemonic(mnemonic, options) {
		const account = helpers_1.makeAccount();
		account.loadFromMnemonic(mnemonic);
		return { type: "bip39", address: account.address() };
	}
	async fromPrivateKey(privateKey, options) {
		const account = helpers_1.makeAccount();
		account.loadFromHexPrivateKey(privateKey);
		return { type: "bip39", address: account.address() };
	}
	async validate(address) {
		try {
			bech32_1.bech32.decode(address);
			return true;
		} catch {
			return false;
		}
	}
}
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map
