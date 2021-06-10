"use strict";
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
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
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
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _DataRepository_storage, _DataRepository_snapshot;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRepository = void 0;
const dot_prop_1 = __importDefault(require("dot-prop"));
const inversify_1 = require("inversify");
let DataRepository = class DataRepository {
	constructor() {
		_DataRepository_storage.set(this, {});
		_DataRepository_snapshot.set(this, void 0);
	}
	all() {
		return __classPrivateFieldGet(this, _DataRepository_storage, "f");
	}
	first() {
		return this.values()[0];
	}
	last() {
		return this.values()[this.count() - 1];
	}
	keys() {
		return Object.keys(__classPrivateFieldGet(this, _DataRepository_storage, "f"));
	}
	values() {
		return Object.values(__classPrivateFieldGet(this, _DataRepository_storage, "f"));
	}
	get(key, defaultValue) {
		return dot_prop_1.default.get(__classPrivateFieldGet(this, _DataRepository_storage, "f"), key, defaultValue);
	}
	set(key, value) {
		dot_prop_1.default.set(__classPrivateFieldGet(this, _DataRepository_storage, "f"), key, value);
	}
	fill(entries) {
		for (const [key, value] of Object.entries(entries)) {
			this.set(key, value);
		}
	}
	has(key) {
		return dot_prop_1.default.has(__classPrivateFieldGet(this, _DataRepository_storage, "f"), key);
	}
	missing(key) {
		return !this.has(key);
	}
	forget(key) {
		dot_prop_1.default.delete(__classPrivateFieldGet(this, _DataRepository_storage, "f"), key);
	}
	forgetIndex(key, index) {
		const value = this.get(key);
		if (value !== undefined) {
			this.set(
				key,
				value.filter((_, i) => i !== index),
			);
		}
	}
	flush() {
		__classPrivateFieldSet(this, _DataRepository_storage, {}, "f");
	}
	count() {
		return this.keys().length;
	}
	snapshot() {
		__classPrivateFieldSet(this, _DataRepository_snapshot, { ...this.all() }, "f");
	}
	restore() {
		if (!__classPrivateFieldGet(this, _DataRepository_snapshot, "f")) {
			throw new Error("There is no snapshot to restore.");
		}
		this.flush();
		for (const [key, value] of Object.entries(__classPrivateFieldGet(this, _DataRepository_snapshot, "f"))) {
			this.set(key, value);
		}
		__classPrivateFieldSet(this, _DataRepository_snapshot, undefined, "f");
	}
	toJSON() {
		return JSON.stringify(__classPrivateFieldGet(this, _DataRepository_storage, "f"));
	}
};
(_DataRepository_storage = new WeakMap()), (_DataRepository_snapshot = new WeakMap());
DataRepository = __decorate([inversify_1.injectable()], DataRepository);
exports.DataRepository = DataRepository;
//# sourceMappingURL=data-repository.js.map
