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
const account_1 = require("@zilliqa-js/account");
const zilliqa_1 = require("@zilliqa-js/zilliqa");
const constants_1 = require("./constants");
const zilliqa_2 = require("./zilliqa");
let AddressService = class AddressService extends platform_sdk_1.Services.AbstractAddressService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "wallet", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	async fromMnemonic(mnemonic, options) {
		return {
			type: "bip44",
			address: (await zilliqa_2.accountFromMnemonic(this.wallet, mnemonic, options)).bech32Address,
		};
	}
	async fromPrivateKey(privateKey, options) {
		return {
			type: "bip44",
			address: (await zilliqa_2.accountFromPrivateKey(this.wallet, privateKey)).bech32Address,
		};
	}
	async validate(address) {
		if (zilliqa_1.validation.isBech32(address)) {
			return true;
		}
		return zilliqa_1.validation.isAddress(address);
	}
};
__decorate(
	[platform_sdk_1.IoC.inject(constants_1.BindingType.Wallet), __metadata("design:type", account_1.Wallet)],
	AddressService.prototype,
	"wallet",
	void 0,
);
AddressService = __decorate([platform_sdk_1.IoC.injectable()], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map
