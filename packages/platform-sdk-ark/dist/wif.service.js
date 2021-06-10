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
exports.WIFService = void 0;
const crypto_1 = require("@arkecosystem/crypto");
const crypto_identities_1 = require("@arkecosystem/crypto-identities");
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const coin_contract_1 = require("./coin.contract");
let WIFService = class WIFService extends platform_sdk_1.Services.AbstractWIFService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "config", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	async fromMnemonic(mnemonic, options) {
		try {
			return {
				wif: crypto_identities_1.WIF.fromPassphrase(mnemonic, this.config.network),
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	async fromPrivateKey(privateKey) {
		try {
			return {
				// @ts-ignore - We don't care about having a public key for this
				wif: crypto_identities_1.WIF.fromKeys({ privateKey, compressed: true }, this.config.network),
			};
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
__decorate(
	[platform_sdk_1.IoC.inject(coin_contract_1.Bindings.Crypto), __metadata("design:type", Object)],
	WIFService.prototype,
	"config",
	void 0,
);
WIFService = __decorate([platform_sdk_1.IoC.injectable()], WIFService);
exports.WIFService = WIFService;
//# sourceMappingURL=wif.service.js.map
