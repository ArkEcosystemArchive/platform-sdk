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
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
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
var _KnownWalletService_source;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnownWalletService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
let KnownWalletService = class KnownWalletService extends platform_sdk_1.Services.AbstractKnownWalletService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "httpClient", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		_KnownWalletService_source.set(this, void 0);
	}
	async all() {
		if (__classPrivateFieldGet(this, _KnownWalletService_source, "f") === undefined) {
			return [];
		}
		try {
			const results = (
				await this.httpClient.get(__classPrivateFieldGet(this, _KnownWalletService_source, "f"))
			).json();
			if (Array.isArray(results)) {
				return results;
			}
			return [];
		} catch (error) {
			return [];
		}
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_KnownWalletService_source,
			this.configRepository.getLoose(platform_sdk_1.Coins.ConfigKey.KnownWallets),
			"f",
		);
	}
};
_KnownWalletService_source = new WeakMap();
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ConfigRepository),
		__metadata("design:type", platform_sdk_1.Coins.ConfigRepository),
	],
	KnownWalletService.prototype,
	"configRepository",
	void 0,
);
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.HttpClient), __metadata("design:type", Object)],
	KnownWalletService.prototype,
	"httpClient",
	void 0,
);
__decorate(
	[
		platform_sdk_1.IoC.postConstruct(),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0),
	],
	KnownWalletService.prototype,
	"onPostConstruct",
	null,
);
KnownWalletService = __decorate([platform_sdk_1.IoC.injectable()], KnownWalletService);
exports.KnownWalletService = KnownWalletService;
//# sourceMappingURL=known-wallets.service.js.map
