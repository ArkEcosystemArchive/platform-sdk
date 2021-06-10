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
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _UnspentTransactionData_data;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnspentTransactionData = void 0;
const ioc_1 = require("../ioc");
let UnspentTransactionData = class UnspentTransactionData {
	constructor(data) {
		_UnspentTransactionData_data.set(this, void 0);
		__classPrivateFieldSet(this, _UnspentTransactionData_data, data, "f");
	}
	id() {
		return __classPrivateFieldGet(this, _UnspentTransactionData_data, "f").id;
	}
	timestamp() {
		return __classPrivateFieldGet(this, _UnspentTransactionData_data, "f").timestamp;
	}
	amount() {
		return __classPrivateFieldGet(this, _UnspentTransactionData_data, "f").amount;
	}
	addresses() {
		return __classPrivateFieldGet(this, _UnspentTransactionData_data, "f").addresses;
	}
};
_UnspentTransactionData_data = new WeakMap();
UnspentTransactionData = __decorate(
	[ioc_1.injectable(), __metadata("design:paramtypes", [Object])],
	UnspentTransactionData,
);
exports.UnspentTransactionData = UnspentTransactionData;
//# sourceMappingURL=unspent-transaction.js.map
