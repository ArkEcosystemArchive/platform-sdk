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
exports.SecondSignatureData = void 0;
const exceptions_1 = require("../exceptions");
const ioc_1 = require("../ioc");
const transaction_1 = require("./transaction");
let SecondSignatureData = class SecondSignatureData extends transaction_1.AbstractTransactionData {
	secondPublicKey() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.secondPublicKey.name);
	}
};
SecondSignatureData = __decorate([ioc_1.injectable()], SecondSignatureData);
exports.SecondSignatureData = SecondSignatureData;
//# sourceMappingURL=second-signature.js.map
