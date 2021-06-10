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
var _AttributeBag_attributes;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeBag = void 0;
const dot_prop_1 = require("dot-prop");
class AttributeBag {
	/**
	 * Creates an instance of AttributeBag.
	 * @param {T} [attributes]
	 * @memberof AttributeBag
	 */
	constructor(attributes) {
		/**
		 * The raw object of attributes.
		 *
		 * @memberof AttributeBag
		 */
		_AttributeBag_attributes.set(this, {});
		if (attributes) {
			__classPrivateFieldSet(this, _AttributeBag_attributes, attributes, "f");
		}
	}
	/**
	 * Get all of the items in the attribute object.
	 *
	 * @return {Partial<T>}
	 * @memberof AttributeBag
	 */
	all() {
		return __classPrivateFieldGet(this, _AttributeBag_attributes, "f");
	}
	/**
	 * Get a given attribute from the attribute object.
	 *
	 * @template U
	 * @param {(keyof T | string)} key
	 * @param {U} [defaultValue]
	 * @return {T}
	 * @memberof AttributeBag
	 */
	get(key, defaultValue) {
		return dot_prop_1.get(__classPrivateFieldGet(this, _AttributeBag_attributes, "f"), key, defaultValue);
	}
	/**
	 * Set a given attribute in the attribute object.
	 *
	 * @template T
	 * @param {(keyof T | string)} key
	 * @param {U} value
	 * @memberof AttributeBag
	 */
	set(key, value) {
		dot_prop_1.set(__classPrivateFieldGet(this, _AttributeBag_attributes, "f"), key, value);
	}
	/**
	 * Set many given attributes in the attribute object.
	 *
	 * @param {object} value
	 * @memberof AttributeBag
	 */
	setMany(value) {
		for (const [k, v] of Object.entries(value)) {
			this.set(k, v);
		}
	}
	/**
	 * Determine if a given attribute exists in the attribute object.
	 *
	 * @param {keyof T} key
	 * @return {boolean}
	 * @memberof AttributeBag
	 */
	has(key) {
		return dot_prop_1.has(__classPrivateFieldGet(this, _AttributeBag_attributes, "f"), key);
	}
	/**
	 * Determine if a given attribute exists in the attribute object
	 * and is not `undefined` or `null` which equal missing contents.
	 *
	 * @param {keyof T} key
	 * @return {boolean}
	 * @memberof AttributeBag
	 */
	hasStrict(key) {
		return dot_prop_1.get(__classPrivateFieldGet(this, _AttributeBag_attributes, "f"), key) !== undefined;
	}
	/**
	 * Determine if a given attribute is missing in the attribute object.
	 *
	 * @param {keyof T} key
	 * @return {boolean}
	 * @memberof AttributeBag
	 */
	missing(key) {
		return !this.has(key);
	}
	/**
	 * Remove an item from the attributes.
	 *
	 * @param {keyof T} key
	 * @memberof AttributeBag
	 */
	forget(key) {
		dot_prop_1.delete(__classPrivateFieldGet(this, _AttributeBag_attributes, "f"), key);
	}
	/**
	 * Remove all items from the attributes.
	 *
	 * @memberof AttributeBag
	 */
	flush() {
		__classPrivateFieldSet(this, _AttributeBag_attributes, {}, "f");
	}
	/**
	 * Only include the given attribute from the attribute object.
	 *
	 * @param {(keyof T)[]} keys
	 * @return {Record<string, any>}
	 * @memberof AttributeBag
	 */
	only(keys) {
		const result = {};
		for (const [key, value] of Object.entries(__classPrivateFieldGet(this, _AttributeBag_attributes, "f"))) {
			if (keys.includes(key)) {
				result[key] = value;
			}
		}
		return result;
	}
	/**
	 * Exclude the given attribute from the attribute object.
	 *
	 * @param {(keyof T)[]} keys
	 * @return {Record<string, any>}
	 * @memberof AttributeBag
	 */
	except(keys) {
		const result = {};
		for (const [key, value] of Object.entries(__classPrivateFieldGet(this, _AttributeBag_attributes, "f"))) {
			if (!keys.includes(key)) {
				result[key] = value;
			}
		}
		return result;
	}
}
exports.AttributeBag = AttributeBag;
_AttributeBag_attributes = new WeakMap();
//# sourceMappingURL=attribute-bag.js.map
