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
exports.AbstractClientService = void 0;
const coins_1 = require("../coins");
const exceptions_1 = require("../exceptions");
const ioc_1 = require("../ioc");
const service_provider_contract_1 = require("../ioc/service-provider.contract");
class AbstractClientService {
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
	async transaction(id, input) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.transaction.name);
	}
	async transactions(query) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.transactions.name);
	}
	async wallet(id) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.wallet.name);
	}
	async wallets(query) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.wallets.name);
	}
	async delegate(id) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.delegate.name);
	}
	async delegates(query) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.delegates.name);
	}
	async votes(id) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.votes.name);
	}
	async voters(id, query) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.voters.name);
	}
	async broadcast(transactions) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.broadcast.name);
	}
}
__decorate(
	[
		ioc_1.inject(service_provider_contract_1.BindingType.ConfigRepository),
		__metadata("design:type", coins_1.ConfigRepository),
	],
	AbstractClientService.prototype,
	"configRepository",
	void 0,
);
__decorate(
	[
		ioc_1.inject(service_provider_contract_1.BindingType.DataTransferObjectService),
		__metadata("design:type", Object),
	],
	AbstractClientService.prototype,
	"dataTransferObjectService",
	void 0,
);
__decorate(
	[ioc_1.inject(service_provider_contract_1.BindingType.HttpClient), __metadata("design:type", Object)],
	AbstractClientService.prototype,
	"httpClient",
	void 0,
);
exports.AbstractClientService = AbstractClientService;
//# sourceMappingURL=client.service.js.map
