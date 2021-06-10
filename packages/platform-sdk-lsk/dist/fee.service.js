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
var _FeeService_instances, _FeeService_transform;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const lisk_transactions_1 = require("@liskhq/lisk-transactions");
let FeeService = class FeeService extends platform_sdk_1.Services.AbstractFeeService {
	constructor() {
		super(...arguments);
		_FeeService_instances.add(this);
		Object.defineProperty(this, "bigNumberService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	async all() {
		return {
			transfer: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"TRANSFER_FEE",
			),
			secondSignature: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"SIGNATURE_FEE",
			),
			delegateRegistration: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"DELEGATE_FEE",
			),
			vote: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"VOTE_FEE",
			),
			multiSignature: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				"MULTISIGNATURE_FEE",
			),
			ipfs: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(this, 0),
			multiPayment: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(this, 0),
			delegateResignation: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(
				this,
				0,
			),
			htlcLock: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(this, 0),
			htlcClaim: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(this, 0),
			htlcRefund: __classPrivateFieldGet(this, _FeeService_instances, "m", _FeeService_transform).call(this, 0),
		};
	}
};
(_FeeService_instances = new WeakSet()),
	(_FeeService_transform = function _FeeService_transform(type) {
		const fee = this.bigNumberService.make(type === 0 ? 0 : lisk_transactions_1.constants[type]);
		return {
			static: fee,
			max: fee,
			min: fee,
			avg: fee,
		};
	});
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
