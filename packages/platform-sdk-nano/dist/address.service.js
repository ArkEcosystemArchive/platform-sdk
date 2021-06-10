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
const nanocurrency_1 = require("nanocurrency");
const nanocurrency_web_1 = require("nanocurrency-web");
const helpers_1 = require("./helpers");
let AddressService = class AddressService extends platform_sdk_1.Services.AbstractAddressService {
	async fromMnemonic(mnemonic, options) {
		var _a;
		return {
			type: "bip44",
			address: helpers_1.deriveAccount(
				mnemonic,
				(_a = options === null || options === void 0 ? void 0 : options.bip44) === null || _a === void 0
					? void 0
					: _a.account,
			).address,
		};
	}
	async fromPublicKey(publicKey, options) {
		return {
			type: "bip44",
			address: nanocurrency_1.deriveAddress(publicKey),
		};
	}
	async fromPrivateKey(privateKey, options) {
		return {
			type: "bip44",
			address: nanocurrency_1.deriveAddress(nanocurrency_1.derivePublicKey(privateKey)),
		};
	}
	async validate(address) {
		return nanocurrency_web_1.tools.validateAddress(address);
	}
};
AddressService = __decorate([platform_sdk_1.IoC.injectable()], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map
