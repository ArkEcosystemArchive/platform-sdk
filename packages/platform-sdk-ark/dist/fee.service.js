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
var _FeeService_instances, _FeeService_transform, _FeeService_get;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
let FeeService = class FeeService extends platform_sdk_1.Services.AbstractFeeService {
	constructor() {
		super(...arguments);
		_FeeService_instances.add(this);
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "bigNumberService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	async all() {
		const node = await __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_get).call(
			this,
			"node/fees",
		);
		const type = await __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_get).call(
			this,
			"transactions/fees",
		);
		const staticFees = type.data;
		const dynamicFees = node.data;
		return {
			transfer: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"transfer",
				1,
				staticFees,
				dynamicFees,
			),
			secondSignature: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"secondSignature",
				1,
				staticFees,
				dynamicFees,
			),
			delegateRegistration: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"delegateRegistration",
				1,
				staticFees,
				dynamicFees,
			),
			vote: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"vote",
				1,
				staticFees,
				dynamicFees,
			),
			multiSignature: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"multiSignature",
				1,
				staticFees,
				dynamicFees,
			),
			ipfs: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"ipfs",
				1,
				staticFees,
				dynamicFees,
			),
			multiPayment: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"multiPayment",
				1,
				staticFees,
				dynamicFees,
			),
			delegateResignation: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"delegateResignation",
				1,
				staticFees,
				dynamicFees,
			),
			htlcLock: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"htlcLock",
				1,
				staticFees,
				dynamicFees,
			),
			htlcClaim: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"htlcClaim",
				1,
				staticFees,
				dynamicFees,
			),
			htlcRefund: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"htlcRefund",
				1,
				staticFees,
				dynamicFees,
			),
		};
	}
};
(_FeeService_instances = new WeakSet()),
	(_FeeService_transform = function _FeeService_transform(type, typeGroup, staticFees, dynamicFees) {
		const dynamicFee = dynamicFees[typeGroup][type];
		return {
			static: this.bigNumberService.make(staticFees[typeGroup][type]),
			min: this.bigNumberService.make(
				(dynamicFee === null || dynamicFee === void 0 ? void 0 : dynamicFee.min) || "0",
			),
			avg: this.bigNumberService.make(
				(dynamicFee === null || dynamicFee === void 0 ? void 0 : dynamicFee.avg) || "0",
			),
			max: this.bigNumberService.make(staticFees[typeGroup][type]),
		};
	}),
	(_FeeService_get = async function _FeeService_get(path, query) {
		return (
			await this.httpClient.get(
				`${platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository)}/${path}`,
				query,
			)
		).json();
	});
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ConfigRepository),
		__metadata("design:type", platform_sdk_1.Coins.ConfigRepository),
	],
	FeeService.prototype,
	"configRepository",
	void 0,
);
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.BigNumberService),
		__metadata("design:type", platform_sdk_1.Services.BigNumberService),
	],
	FeeService.prototype,
	"bigNumberService",
	void 0,
);
FeeService = __decorate([platform_sdk_1.IoC.injectable()], FeeService);
exports.FeeService = FeeService;
//# sourceMappingURL=fee.service.js.map
