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
exports.DelegateResignationData = void 0;
const ioc_1 = require("../ioc");
const transaction_1 = require("./transaction");
let DelegateResignationData = class DelegateResignationData extends transaction_1.AbstractTransactionData {};
DelegateResignationData = __decorate([ioc_1.injectable()], DelegateResignationData);
exports.DelegateResignationData = DelegateResignationData;
//# sourceMappingURL=delegate-resignation.js.map
