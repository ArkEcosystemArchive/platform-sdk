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
exports.DelegateRegistrationData = void 0;
const exceptions_1 = require("../exceptions");
const ioc_1 = require("../ioc");
const transaction_1 = require("./transaction");
let DelegateRegistrationData = class DelegateRegistrationData extends transaction_1.AbstractTransactionData {
	username() {
		throw new exceptions_1.NotSupported(this.constructor.name, this.username.name);
	}
};
DelegateRegistrationData = __decorate([ioc_1.injectable()], DelegateRegistrationData);
exports.DelegateRegistrationData = DelegateRegistrationData;
//# sourceMappingURL=delegate-registration.js.map
