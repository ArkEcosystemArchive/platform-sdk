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
exports.AbstractSignedTransactionData = void 0;
const exceptions_1 = require("../exceptions");
const ioc_1 = require("../ioc");
const service_provider_contract_1 = require("../ioc/service-provider.contract");
const services_1 = require("../services");
let AbstractSignedTransactionData = class AbstractSignedTransactionData {
	constructor() {
		Object.defineProperty(this, "bigNumberService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "identifier", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "signedData", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "broadcastData", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "decimals", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
	}
	configure(identifier, signedData, broadcastData, decimals) {
		this.identifier = identifier;
		this.signedData = signedData;
		this.broadcastData = broadcastData;
		this.decimals = typeof decimals === "string" ? parseInt(decimals) : decimals;
		return this;
	}
	setAttributes(attributes) {
		this.identifier = attributes.identifier;
	}
	id() {
		return this.identifier;
	}
	data() {
		return this.signedData;
	}
	sender() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.sender.name);
	}
	recipient() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.recipient.name);
	}
	amount() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.amount.name);
	}
	fee() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.fee.name);
	}
	timestamp() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.timestamp.name);
	}
	isMultiSignature() {
		return false;
	}
	isMultiSignatureRegistration() {
		return false;
	}
	get(key) {
		return this.signedData[key];
	}
	toString() {
		if (typeof this.signedData === "string") {
			return this.signedData;
		}
		return JSON.stringify(this.signedData);
	}
	toBroadcast() {
		return this.broadcastData;
	}
	toObject() {
		return {
			id: this.id(),
			sender: this.sender(),
			recipient: this.recipient(),
			amount: this.amount().toFixed(),
			fee: this.fee().toFixed(),
			timestamp: this.timestamp().toISOString(),
			data: this.data(),
			broadcast: this.toBroadcast(),
		};
	}
};
__decorate(
	[
		ioc_1.inject(service_provider_contract_1.BindingType.BigNumberService),
		__metadata("design:type", services_1.BigNumberService),
	],
	AbstractSignedTransactionData.prototype,
	"bigNumberService",
	void 0,
);
AbstractSignedTransactionData = __decorate([ioc_1.injectable()], AbstractSignedTransactionData);
exports.AbstractSignedTransactionData = AbstractSignedTransactionData;
//# sourceMappingURL=signed-transaction.js.map
