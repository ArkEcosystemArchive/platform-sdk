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
exports.KeyPairService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const avalanche_1 = require("avalanche");
const helpers_1 = require("./helpers");
let KeyPairService = class KeyPairService extends platform_sdk_1.Services.AbstractKeyPairService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	async fromMnemonic(mnemonic, options) {
		const { child, path } = helpers_1.keyPairFromMnemonic(this.configRepository, mnemonic, options);
		return {
			publicKey: helpers_1.cb58Encode(child.getPublicKey()),
			privateKey: helpers_1.cb58Encode(child.getPrivateKey()),
			path,
		};
	}
	async fromPrivateKey(privateKey) {
		const keyPair = helpers_1
			.useKeychain(this.configRepository)
			.importKey(avalanche_1.BinTools.getInstance().cb58Decode(privateKey));
		return {
			publicKey: helpers_1.cb58Encode(keyPair.getPublicKey()),
			privateKey: helpers_1.cb58Encode(keyPair.getPrivateKey()),
		};
	}
};
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ConfigRepository),
		__metadata("design:type", platform_sdk_1.Coins.ConfigRepository),
	],
	KeyPairService.prototype,
	"configRepository",
	void 0,
);
KeyPairService = __decorate([platform_sdk_1.IoC.injectable()], KeyPairService);
exports.KeyPairService = KeyPairService;
//# sourceMappingURL=key-pair.service.js.map
