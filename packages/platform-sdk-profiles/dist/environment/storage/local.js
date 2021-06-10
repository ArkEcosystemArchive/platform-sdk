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
var _LocalStorage_storage, _LocalStorage_snapshot;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
const localforage_1 = __importDefault(require("localforage"));
class LocalStorage {
	constructor(driver) {
		_LocalStorage_storage.set(this, void 0);
		_LocalStorage_snapshot.set(this, void 0);
		__classPrivateFieldSet(
			this,
			_LocalStorage_storage,
			localforage_1.default.createInstance({
				driver: {
					indexeddb: localforage_1.default.INDEXEDDB,
					websql: localforage_1.default.WEBSQL,
					localstorage: localforage_1.default.LOCALSTORAGE,
				}[driver],
			}),
			"f",
		);
	}
	async all() {
		const result = {};
		for (const key of await __classPrivateFieldGet(this, _LocalStorage_storage, "f").keys()) {
			result[key] = await this.get(key);
		}
		return result;
	}
	async get(key) {
		return __classPrivateFieldGet(this, _LocalStorage_storage, "f").getItem(key);
	}
	async set(key, value) {
		await __classPrivateFieldGet(this, _LocalStorage_storage, "f").setItem(key, value);
	}
	async has(key) {
		return (await __classPrivateFieldGet(this, _LocalStorage_storage, "f").keys()).includes(key);
	}
	async forget(key) {
		await __classPrivateFieldGet(this, _LocalStorage_storage, "f").removeItem(key);
	}
	async flush() {
		await __classPrivateFieldGet(this, _LocalStorage_storage, "f").clear();
	}
	async count() {
		return __classPrivateFieldGet(this, _LocalStorage_storage, "f").length();
	}
	async snapshot() {
		__classPrivateFieldSet(this, _LocalStorage_snapshot, await this.all(), "f");
	}
	async restore() {
		if (!__classPrivateFieldGet(this, _LocalStorage_snapshot, "f")) {
			throw new Error("There is no snapshot to restore.");
		}
		await this.flush();
		for (const [key, value] of Object.entries(__classPrivateFieldGet(this, _LocalStorage_snapshot, "f"))) {
			await this.set(key, value);
		}
	}
}
exports.LocalStorage = LocalStorage;
(_LocalStorage_storage = new WeakMap()), (_LocalStorage_snapshot = new WeakMap());
//# sourceMappingURL=local.js.map
