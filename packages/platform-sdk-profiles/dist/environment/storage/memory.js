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
var _MemoryStorage_storage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStorage = void 0;
class MemoryStorage {
	constructor(data) {
		_MemoryStorage_storage.set(this, {});
		__classPrivateFieldSet(this, _MemoryStorage_storage, data || {}, "f");
	}
	async all() {
		return __classPrivateFieldGet(this, _MemoryStorage_storage, "f");
	}
	async get(key) {
		return __classPrivateFieldGet(this, _MemoryStorage_storage, "f")[key];
	}
	async set(key, value) {
		__classPrivateFieldGet(this, _MemoryStorage_storage, "f")[key] = value;
	}
	async has(key) {
		return Object.keys(__classPrivateFieldGet(this, _MemoryStorage_storage, "f")).includes(key);
	}
	async forget(key) {
		delete __classPrivateFieldGet(this, _MemoryStorage_storage, "f")[key];
	}
	async flush() {
		__classPrivateFieldSet(this, _MemoryStorage_storage, {}, "f");
	}
	async count() {
		return Object.keys(__classPrivateFieldGet(this, _MemoryStorage_storage, "f")).length;
	}
	async snapshot() {
		//
	}
	async restore() {
		//
	}
}
exports.MemoryStorage = MemoryStorage;
_MemoryStorage_storage = new WeakMap();
//# sourceMappingURL=memory.js.map
