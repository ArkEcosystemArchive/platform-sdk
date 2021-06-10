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
exports.PublicKeyService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const helpers_1 = require("./helpers");
let PublicKeyService = class PublicKeyService extends platform_sdk_1.Services.AbstractPublicKeyService {
	async fromMnemonic(mnemonic, options) {
		const account = helpers_1.makeAccount();
		account.loadFromMnemonic(mnemonic);
		return { publicKey: account.publicKeyAsString() };
	}
};
PublicKeyService = __decorate([platform_sdk_1.IoC.injectable()], PublicKeyService);
exports.PublicKeyService = PublicKeyService;
//# sourceMappingURL=public-key.service.js.map
