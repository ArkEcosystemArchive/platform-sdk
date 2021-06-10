"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullStorage = void 0;
class NullStorage {
	async all() {
		return {};
	}
	async get(key) {
		return undefined;
	}
	async set(key, value) {
		//
	}
	async has(key) {
		return false;
	}
	async forget(key) {
		//
	}
	async flush() {
		//
	}
	async count() {
		return 0;
	}
	async snapshot() {
		//
	}
	async restore() {
		//
	}
}
exports.NullStorage = NullStorage;
//# sourceMappingURL=null.js.map
