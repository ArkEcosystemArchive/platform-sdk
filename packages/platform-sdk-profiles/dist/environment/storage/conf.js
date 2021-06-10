"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _ConfStorage_storage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfStorage = void 0;
const conf_1 = __importDefault(require("conf"));
class ConfStorage {
	constructor() {
		_ConfStorage_storage.set(this, new conf_1.default());
	}
	async all() {
		return __classPrivateFieldGet(this, _ConfStorage_storage, "f").store;
	}
	async get(key) {
		return __classPrivateFieldGet(this, _ConfStorage_storage, "f").get(key);
	}
	async set(key, value) {
		__classPrivateFieldGet(this, _ConfStorage_storage, "f").set(key, value);
	}
	async has(key) {
		return __classPrivateFieldGet(this, _ConfStorage_storage, "f").has(key);
	}
	async forget(key) {
		__classPrivateFieldGet(this, _ConfStorage_storage, "f").delete(key);
	}
	async flush() {
		__classPrivateFieldGet(this, _ConfStorage_storage, "f").clear();
	}
	async count() {
		return __classPrivateFieldGet(this, _ConfStorage_storage, "f").size;
	}
	async snapshot() {
		//
	}
	async restore() {
		//
	}
}
exports.ConfStorage = ConfStorage;
_ConfStorage_storage = new WeakMap();
//# sourceMappingURL=conf.js.map
