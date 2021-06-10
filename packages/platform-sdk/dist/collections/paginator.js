"use strict";
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
var _Paginator_data, _Paginator_pagination;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginator = void 0;
class Paginator {
	constructor(data, pagination) {
		_Paginator_data.set(this, void 0);
		_Paginator_pagination.set(this, void 0);
		__classPrivateFieldSet(this, _Paginator_data, data, "f");
		__classPrivateFieldSet(this, _Paginator_pagination, pagination, "f");
	}
	items() {
		return __classPrivateFieldGet(this, _Paginator_data, "f");
	}
	first() {
		return __classPrivateFieldGet(this, _Paginator_data, "f")[0];
	}
	last() {
		return __classPrivateFieldGet(this, _Paginator_data, "f").reverse()[0];
	}
	previousPage() {
		return __classPrivateFieldGet(this, _Paginator_pagination, "f").prev;
	}
	currentPage() {
		return __classPrivateFieldGet(this, _Paginator_pagination, "f").self;
	}
	nextPage() {
		return __classPrivateFieldGet(this, _Paginator_pagination, "f").next;
	}
	lastPage() {
		return __classPrivateFieldGet(this, _Paginator_pagination, "f").last;
	}
	hasMorePages() {
		return Boolean(this.nextPage());
	}
	isEmpty() {
		return (
			__classPrivateFieldGet(this, _Paginator_data, "f") === undefined ||
			__classPrivateFieldGet(this, _Paginator_data, "f").length === 0
		);
	}
	isNotEmpty() {
		return !this.isEmpty();
	}
	transform(callback) {
		for (let i = 0; i < __classPrivateFieldGet(this, _Paginator_data, "f").length; i++) {
			__classPrivateFieldGet(this, _Paginator_data, "f")[i] = callback(
				__classPrivateFieldGet(this, _Paginator_data, "f")[i],
			);
		}
	}
	getData() {
		return __classPrivateFieldGet(this, _Paginator_data, "f");
	}
	getPagination() {
		return __classPrivateFieldGet(this, _Paginator_pagination, "f");
	}
}
exports.Paginator = Paginator;
(_Paginator_data = new WeakMap()), (_Paginator_pagination = new WeakMap());
//# sourceMappingURL=paginator.js.map
