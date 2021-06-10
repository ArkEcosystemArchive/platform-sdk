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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractLedgerService = void 0;
const exceptions_1 = require("../exceptions");
const ioc_1 = require("../ioc");
let AbstractLedgerService = class AbstractLedgerService {
	async __destruct() {
		await this.disconnect();
	}
	async connect(transport) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.connect.name);
	}
	async disconnect() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.disconnect.name);
	}
	async getVersion() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.getVersion.name);
	}
	async getPublicKey(path) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.getPublicKey.name);
	}
	async getExtendedPublicKey(path) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.getExtendedPublicKey.name);
	}
	async signTransaction(path, payload) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.signTransaction.name);
	}
	async signMessage(path, payload) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.signMessage.name);
	}
	async scan(options) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.scan.name);
	}
};
AbstractLedgerService = __decorate([ioc_1.injectable()], AbstractLedgerService);
exports.AbstractLedgerService = AbstractLedgerService;
//# sourceMappingURL=ledger.service.js.map
