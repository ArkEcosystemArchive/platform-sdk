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
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _Cache_instances, _Cache_prefix, _Cache_cache, _Cache_getCacheKey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const bcrypto_1 = require("bcrypto");
const node_cache_1 = __importDefault(require("node-cache"));
class Cache {
	constructor(prefix) {
		_Cache_instances.add(this);
		_Cache_prefix.set(this, void 0);
		_Cache_cache.set(this, new node_cache_1.default());
		__classPrivateFieldSet(this, _Cache_prefix, prefix, "f");
	}
	/** {@inheritDoc ICache.all} */
	all() {
		return __classPrivateFieldGet(this, _Cache_cache, "f").mget(this.keys());
	}
	/** {@inheritDoc ICache.keys} */
	keys() {
		return __classPrivateFieldGet(this, _Cache_cache, "f").keys();
	}
	/** {@inheritDoc ICache.get} */
	get(key) {
		const value = __classPrivateFieldGet(this, _Cache_cache, "f").get(
			__classPrivateFieldGet(this, _Cache_instances, "m", _Cache_getCacheKey).call(this, key),
		);
		if (value === undefined) {
			throw new Error(`The [${key}] is an unknown cache value.`);
		}
		return value;
	}
	/** {@inheritDoc ICache.set} */
	set(key, value, ttl) {
		__classPrivateFieldGet(this, _Cache_cache, "f").set(
			__classPrivateFieldGet(this, _Cache_instances, "m", _Cache_getCacheKey).call(this, key),
			value,
			ttl,
		);
	}
	/** {@inheritDoc ICache.has} */
	has(key) {
		return __classPrivateFieldGet(this, _Cache_cache, "f").has(
			__classPrivateFieldGet(this, _Cache_instances, "m", _Cache_getCacheKey).call(this, key),
		);
	}
	/** {@inheritDoc ICache.forget} */
	forget(key) {
		__classPrivateFieldGet(this, _Cache_cache, "f").del(
			__classPrivateFieldGet(this, _Cache_instances, "m", _Cache_getCacheKey).call(this, key),
		);
	}
	/** {@inheritDoc ICache.flush} */
	flush() {
		__classPrivateFieldGet(this, _Cache_cache, "f").flushAll();
	}
}
exports.Cache = Cache;
(_Cache_prefix = new WeakMap()),
	(_Cache_cache = new WeakMap()),
	(_Cache_instances = new WeakSet()),
	(_Cache_getCacheKey = function _Cache_getCacheKey(value) {
		return bcrypto_1.SHA1.digest(
			Buffer.from(`${__classPrivateFieldGet(this, _Cache_prefix, "f")}.${JSON.stringify(value)}`, "utf-8"),
		).toString("hex");
	});
//# sourceMappingURL=cache.js.map
