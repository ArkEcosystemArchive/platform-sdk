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
exports.AbstractMultiSignatureService = void 0;
const exceptions_1 = require("../exceptions");
const ioc_1 = require("../ioc");
let AbstractMultiSignatureService = class AbstractMultiSignatureService {
	async allWithPendingState(publicKey) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.allWithPendingState.name);
	}
	async allWithReadyState(publicKey) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.allWithReadyState.name);
	}
	async findById(id) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.findById.name);
	}
	async broadcast(transaction) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.broadcast.name);
	}
	isMultiSignatureReady(transaction, excludeFinal) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isMultiSignatureReady.name);
	}
	needsSignatures(transaction) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.needsSignatures.name);
	}
	needsAllSignatures(transaction) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.needsAllSignatures.name);
	}
	needsWalletSignature(transaction, publicKey) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.needsWalletSignature.name);
	}
	needsFinalSignature(transaction) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.needsFinalSignature.name);
	}
	getValidMultiSignatures(transaction) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.getValidMultiSignatures.name);
	}
	remainingSignatureCount(transaction) {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.remainingSignatureCount.name);
	}
};
AbstractMultiSignatureService = __decorate([ioc_1.injectable()], AbstractMultiSignatureService);
exports.AbstractMultiSignatureService = AbstractMultiSignatureService;
//# sourceMappingURL=multi-signature.service.js.map
