"use strict";
/* istanbul ignore file */
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				Object.defineProperty(o, k2, {
					enumerable: true,
					get: function () {
						return m[k];
					},
				});
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, "default", { enumerable: true, value: v });
		  }
		: function (o, v) {
				o["default"] = v;
		  });
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
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
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
var _AbstractDataTransferObjectService_instances, _AbstractDataTransferObjectService_resolveTransactionClass;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractDataTransferObjectService = void 0;
const dot_prop_1 = require("dot-prop");
const coins_1 = require("../coins");
const collections_1 = require("../collections");
const DataTransferObjects = __importStar(require("../dto"));
const ioc_1 = require("../ioc");
const service_provider_contract_1 = require("../ioc/service-provider.contract");
let AbstractDataTransferObjectService = class AbstractDataTransferObjectService {
	constructor() {
		_AbstractDataTransferObjectService_instances.add(this);
		// @TODO: rework so that the container is not needed, this is a weird setup
		Object.defineProperty(this, "container", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "dataTransferObjects", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	signedTransaction(identifier, signedData, broadcastData) {
		const signedTransaction = this.container.resolve(this.dataTransferObjects.SignedTransactionData);
		signedTransaction.configure(
			identifier,
			signedData,
			broadcastData,
			this.configRepository.get(coins_1.ConfigKey.CurrencyDecimals),
		);
		return signedTransaction;
	}
	transaction(transaction) {
		const instance = __classPrivateFieldGet(
			this,
			_AbstractDataTransferObjectService_instances,
			"m",
			_AbstractDataTransferObjectService_resolveTransactionClass,
		).call(this, "TransactionData", transaction);
		if (instance.isDelegateRegistration()) {
			return __classPrivateFieldGet(
				this,
				_AbstractDataTransferObjectService_instances,
				"m",
				_AbstractDataTransferObjectService_resolveTransactionClass,
			).call(this, "DelegateRegistrationData", transaction);
		}
		if (instance.isDelegateResignation()) {
			return __classPrivateFieldGet(
				this,
				_AbstractDataTransferObjectService_instances,
				"m",
				_AbstractDataTransferObjectService_resolveTransactionClass,
			).call(this, "DelegateResignationData", transaction);
		}
		if (instance.isHtlcClaim()) {
			return __classPrivateFieldGet(
				this,
				_AbstractDataTransferObjectService_instances,
				"m",
				_AbstractDataTransferObjectService_resolveTransactionClass,
			).call(this, "HtlcClaimData", transaction);
		}
		if (instance.isHtlcLock()) {
			return __classPrivateFieldGet(
				this,
				_AbstractDataTransferObjectService_instances,
				"m",
				_AbstractDataTransferObjectService_resolveTransactionClass,
			).call(this, "HtlcLockData", transaction);
		}
		if (instance.isHtlcRefund()) {
			return __classPrivateFieldGet(
				this,
				_AbstractDataTransferObjectService_instances,
				"m",
				_AbstractDataTransferObjectService_resolveTransactionClass,
			).call(this, "HtlcRefundData", transaction);
		}
		if (instance.isIpfs()) {
			return __classPrivateFieldGet(
				this,
				_AbstractDataTransferObjectService_instances,
				"m",
				_AbstractDataTransferObjectService_resolveTransactionClass,
			).call(this, "IpfsData", transaction);
		}
		if (instance.isMultiPayment()) {
			return __classPrivateFieldGet(
				this,
				_AbstractDataTransferObjectService_instances,
				"m",
				_AbstractDataTransferObjectService_resolveTransactionClass,
			).call(this, "MultiPaymentData", transaction);
		}
		if (instance.isMultiSignature()) {
			return __classPrivateFieldGet(
				this,
				_AbstractDataTransferObjectService_instances,
				"m",
				_AbstractDataTransferObjectService_resolveTransactionClass,
			).call(this, "MultiSignatureData", transaction);
		}
		if (instance.isSecondSignature()) {
			return __classPrivateFieldGet(
				this,
				_AbstractDataTransferObjectService_instances,
				"m",
				_AbstractDataTransferObjectService_resolveTransactionClass,
			).call(this, "SecondSignatureData", transaction);
		}
		if (instance.isTransfer()) {
			return __classPrivateFieldGet(
				this,
				_AbstractDataTransferObjectService_instances,
				"m",
				_AbstractDataTransferObjectService_resolveTransactionClass,
			).call(this, "TransferData", transaction);
		}
		if (instance.isVote()) {
			return __classPrivateFieldGet(
				this,
				_AbstractDataTransferObjectService_instances,
				"m",
				_AbstractDataTransferObjectService_resolveTransactionClass,
			).call(this, "VoteData", transaction);
		}
		if (instance.isUnvote()) {
			return __classPrivateFieldGet(
				this,
				_AbstractDataTransferObjectService_instances,
				"m",
				_AbstractDataTransferObjectService_resolveTransactionClass,
			).call(this, "VoteData", transaction);
		}
		return instance;
	}
	transactions(transactions, meta) {
		return new collections_1.TransactionDataCollection(
			transactions.map((transaction) => this.transaction(transaction)),
			meta,
		);
	}
};
(_AbstractDataTransferObjectService_instances = new WeakSet()),
	(_AbstractDataTransferObjectService_resolveTransactionClass = function _AbstractDataTransferObjectService_resolveTransactionClass(
		klass,
		transaction,
	) {
		return this.container
			.resolve(dot_prop_1.get(this.dataTransferObjects, klass) || dot_prop_1.get(DataTransferObjects, klass))
			.configure(transaction)
			.withDecimals(this.configRepository.get(coins_1.ConfigKey.CurrencyDecimals));
	});
__decorate(
	[ioc_1.inject(service_provider_contract_1.BindingType.Container), __metadata("design:type", ioc_1.Container)],
	AbstractDataTransferObjectService.prototype,
	"container",
	void 0,
);
__decorate(
	[
		ioc_1.inject(service_provider_contract_1.BindingType.ConfigRepository),
		__metadata("design:type", coins_1.ConfigRepository),
	],
	AbstractDataTransferObjectService.prototype,
	"configRepository",
	void 0,
);
__decorate(
	[ioc_1.inject(service_provider_contract_1.BindingType.DataTransferObjects), __metadata("design:type", Object)],
	AbstractDataTransferObjectService.prototype,
	"dataTransferObjects",
	void 0,
);
AbstractDataTransferObjectService = __decorate([ioc_1.injectable()], AbstractDataTransferObjectService);
exports.AbstractDataTransferObjectService = AbstractDataTransferObjectService;
//# sourceMappingURL=data-transfer-object.service.js.map
