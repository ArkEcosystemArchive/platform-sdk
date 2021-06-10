"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const helpers_1 = require("./helpers");
class AddressService extends platform_sdk_1.Services.AbstractAddressService {
	async fromMnemonic(mnemonic, options) {
		return { type: "bip39", address: helpers_1.deriveKey(mnemonic).accAddress };
	}
	async validate(address) {
		return true;
	}
}
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map
