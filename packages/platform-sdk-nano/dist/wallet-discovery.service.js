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
exports.WalletDiscoveryService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const helpers_1 = require("./helpers");
let WalletDiscoveryService = class WalletDiscoveryService {
	//
	async fromMnemonic(mnemonic, options) {
		var _a, _b;
		const [legacy, standard] = await Promise.all([
			helpers_1.deriveLegacyAccount(
				mnemonic,
				((_a = options === null || options === void 0 ? void 0 : options.bip44) === null || _a === void 0
					? void 0
					: _a.account) || 0,
			),
			helpers_1.deriveAccount(
				mnemonic,
				((_b = options === null || options === void 0 ? void 0 : options.bip44) === null || _b === void 0
					? void 0
					: _b.account) || 0,
			),
		]);
		return [
			{
				type: "bip44.legacy",
				address: legacy.address,
				path: "@TODO",
			},
			{
				type: "bip44",
				address: standard.address,
				path: "@TODO",
			},
		];
	}
};
WalletDiscoveryService = __decorate([platform_sdk_1.IoC.injectable()], WalletDiscoveryService);
exports.WalletDiscoveryService = WalletDiscoveryService;
//# sourceMappingURL=wallet-discovery.service.js.map
