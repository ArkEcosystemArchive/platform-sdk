"use strict";
/* istanbul ignore file */
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
exports.AbstractTransactionService = void 0;
const coins_1 = require("../coins");
const exceptions_1 = require("../exceptions");
const ioc_1 = require("../ioc");
const service_provider_contract_1 = require("../ioc/service-provider.contract");
let AbstractTransactionService = class AbstractTransactionService {
	constructor() {
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "dataTransferObjectService", {
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
	}
	async transfer(input) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.transfer.name);
	}
	async secondSignature(input) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.secondSignature.name);
	}
	async delegateRegistration(input) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.delegateRegistration.name);
	}
	async vote(input) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.vote.name);
	}
	async multiSignature(input) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.multiSignature.name);
	}
	async ipfs(input) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.ipfs.name);
	}
	async multiPayment(input) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.multiPayment.name);
	}
	async delegateResignation(input) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.delegateResignation.name);
	}
	async htlcLock(input) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.htlcLock.name);
	}
	async htlcClaim(input) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.htlcClaim.name);
	}
	async htlcRefund(input) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.htlcRefund.name);
	}
	async multiSign(transaction, input) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.multiSign.name);
	}
	async estimateExpiration(value) {
		return undefined;
	}
};
__decorate(
	[
		ioc_1.inject(service_provider_contract_1.BindingType.ConfigRepository),
		__metadata("design:type", coins_1.ConfigRepository),
	],
	AbstractTransactionService.prototype,
	"configRepository",
	void 0,
);
__decorate(
	[
		ioc_1.inject(service_provider_contract_1.BindingType.DataTransferObjectService),
		__metadata("design:type", Object),
	],
	AbstractTransactionService.prototype,
	"dataTransferObjectService",
	void 0,
);
__decorate(
	[ioc_1.inject(service_provider_contract_1.BindingType.HttpClient), __metadata("design:type", Object)],
	AbstractTransactionService.prototype,
	"httpClient",
	void 0,
);
AbstractTransactionService = __decorate([ioc_1.injectable()], AbstractTransactionService);
exports.AbstractTransactionService = AbstractTransactionService;
//# sourceMappingURL=transaction.service.js.map
