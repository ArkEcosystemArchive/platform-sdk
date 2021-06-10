"use strict";
/* istanbul ignore file */
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
var _Container_instances, _Container_container, _Container_bind;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const inversify_1 = require("inversify");
class Container {
	constructor() {
		_Container_instances.add(this);
		_Container_container.set(this, void 0);
		__classPrivateFieldSet(
			this,
			_Container_container,
			new inversify_1.Container({ skipBaseClassChecks: true }),
			"f",
		);
	}
	get(key) {
		return __classPrivateFieldGet(this, _Container_container, "f").get(key);
	}
	constant(key, value) {
		__classPrivateFieldGet(this, _Container_instances, "m", _Container_bind).call(this, key).toConstantValue(value);
	}
	singleton(key, value) {
		__classPrivateFieldGet(this, _Container_instances, "m", _Container_bind)
			.call(this, key)
			.to(value)
			.inSingletonScope();
	}
	has(key) {
		return __classPrivateFieldGet(this, _Container_container, "f").isBound(key);
	}
	resolve(constructorFunction) {
		return __classPrivateFieldGet(this, _Container_container, "f").resolve(constructorFunction);
	}
	missing(key) {
		return !this.has(key);
	}
	unbind(key) {
		__classPrivateFieldGet(this, _Container_container, "f").unbind(key);
	}
	flush() {
		__classPrivateFieldGet(this, _Container_container, "f").unbindAll();
	}
}
exports.Container = Container;
(_Container_container = new WeakMap()),
	(_Container_instances = new WeakSet()),
	(_Container_bind = function _Container_bind(key) {
		if (this.has(key)) {
			throw new Error(`Duplicate binding attempted for ${key.toString()}`);
		}
		return __classPrivateFieldGet(this, _Container_container, "f").bind(key);
	});
//# sourceMappingURL=container.js.map
