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
exports.AddressService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const keyring_1 = require("@polkadot/keyring");
const util_1 = require("@polkadot/util");
const util_crypto_1 = require("@polkadot/util-crypto");
const constants_1 = require("./constants");
let AddressService = class AddressService extends platform_sdk_1.Services.AbstractAddressService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "keyring", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	async fromMnemonic(mnemonic, options) {
		return {
			type: "ss58",
			address: this.keyring.addFromMnemonic(mnemonic).address,
		};
	}
	async fromMultiSignature(min, publicKeys) {
		return {
			type: "ss58",
			address: keyring_1.encodeAddress(util_crypto_1.createKeyMulti(publicKeys, min), 0),
		};
	}
	async validate(address) {
		try {
			keyring_1.encodeAddress(
				util_1.isHex(address) ? util_1.hexToU8a(address) : keyring_1.decodeAddress(address),
			);
			return true;
		} catch {
			return false;
		}
	}
};
__decorate(
	[platform_sdk_1.IoC.inject(constants_1.BindingType.Keyring), __metadata("design:type", keyring_1.Keyring)],
	AddressService.prototype,
	"keyring",
	void 0,
);
AddressService = __decorate([platform_sdk_1.IoC.injectable()], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map
