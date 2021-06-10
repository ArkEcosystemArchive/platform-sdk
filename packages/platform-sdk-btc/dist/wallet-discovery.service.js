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
exports.WalletDiscoveryService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const address_factory_1 = require("./address.factory");
let WalletDiscoveryService = class WalletDiscoveryService extends platform_sdk_1.Services
	.AbstractWalletDiscoveryService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "addressFactory", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	async fromMnemonic(mnemonic, options) {
		return Promise.all([
			this.addressFactory.bip44(mnemonic, options),
			this.addressFactory.bip49(mnemonic, options),
			this.addressFactory.bip84(mnemonic, options),
		]);
	}
};
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ConfigRepository),
		__metadata("design:type", platform_sdk_1.Coins.ConfigRepository),
	],
	WalletDiscoveryService.prototype,
	"configRepository",
	void 0,
);
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.AddressService),
		__metadata("design:type", address_factory_1.AddressFactory),
	],
	WalletDiscoveryService.prototype,
	"addressFactory",
	void 0,
);
WalletDiscoveryService = __decorate([platform_sdk_1.IoC.injectable()], WalletDiscoveryService);
exports.WalletDiscoveryService = WalletDiscoveryService;
//# sourceMappingURL=wallet-discovery.service.js.map
