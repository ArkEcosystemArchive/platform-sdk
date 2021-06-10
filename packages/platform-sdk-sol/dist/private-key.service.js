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
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _PrivateKeyService_slip44;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateKeyService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const helpers_1 = require("./helpers");
let PrivateKeyService = class PrivateKeyService extends platform_sdk_1.Services.AbstractPrivateKeyService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		_PrivateKeyService_slip44.set(this, void 0);
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_PrivateKeyService_slip44,
			this.configRepository.get("network.constants.slip44"),
			"f",
		);
	}
	async fromMnemonic(mnemonic, options) {
		var _a, _b;
		if (!platform_sdk_crypto_1.BIP39.validate(mnemonic)) {
			throw new platform_sdk_1.Exceptions.InvalidArguments(this.constructor.name, this.fromMnemonic.name);
		}
		return {
			privateKey: helpers_1
				.derivePrivateKey(
					mnemonic,
					((_a = options === null || options === void 0 ? void 0 : options.bip44) === null || _a === void 0
						? void 0
						: _a.account) || 0,
					((_b = options === null || options === void 0 ? void 0 : options.bip44) === null || _b === void 0
						? void 0
						: _b.addressIndex) || 0,
					__classPrivateFieldGet(this, _PrivateKeyService_slip44, "f"),
				)
				.toString("hex"),
		};
	}
};
_PrivateKeyService_slip44 = new WeakMap();
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ConfigRepository),
		__metadata("design:type", platform_sdk_1.Coins.ConfigRepository),
	],
	PrivateKeyService.prototype,
	"configRepository",
	void 0,
);
__decorate(
	[
		platform_sdk_1.IoC.postConstruct(),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0),
	],
	PrivateKeyService.prototype,
	"onPostConstruct",
	null,
);
PrivateKeyService = __decorate([platform_sdk_1.IoC.injectable()], PrivateKeyService);
exports.PrivateKeyService = PrivateKeyService;
//# sourceMappingURL=private-key.service.js.map
