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
var _Numeral_locale, _Numeral_options;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Numeral = void 0;
/**
 * Implements helpers for numerical formatting with currencies and unit.
 *
 * @export
 * @class Numeral
 */
class Numeral {
	/**
	 * Creates an instance of Numeral.
	 *
	 * @param {string} locale
	 * @param {Intl.NumberFormatOptions} [options]
	 * @memberof Numeral
	 */
	constructor(locale, options) {
		/**
		 * The locale that will be used for formatting.
		 *
		 * @type {string}
		 * @memberof Numeral
		 */
		_Numeral_locale.set(this, void 0);
		/**
		 * The options that should be used for formatting.
		 *
		 * @type {Intl.NumberFormatOptions}
		 * @memberof Numeral
		 */
		_Numeral_options.set(this, void 0);
		__classPrivateFieldSet(this, _Numeral_locale, locale, "f");
		__classPrivateFieldSet(this, _Numeral_options, options || {}, "f");
	}
	/**
	 * Creates an instance of Numeral.
	 *
	 * @static
	 * @param {string} locale
	 * @param {Intl.NumberFormatOptions} [options]
	 * @returns {Numeral}
	 * @memberof Numeral
	 */
	static make(locale, options) {
		return new Numeral(locale, options);
	}
	/**
	 * Returns the formatted value.
	 *
	 * @param {number} value
	 * @returns {string}
	 * @memberof Numeral
	 */
	format(value) {
		return new Intl.NumberFormat(__classPrivateFieldGet(this, _Numeral_locale, "f")).format(value);
	}
	/**
	 * Returns the formatted value with the given currency as suffix.
	 *
	 * @param {number} value
	 * @param {string} currency
	 * @returns {string}
	 * @memberof Numeral
	 */
	formatAsCurrency(value, currency) {
		return new Intl.NumberFormat(__classPrivateFieldGet(this, _Numeral_locale, "f"), {
			...__classPrivateFieldGet(this, _Numeral_options, "f"),
			style: "currency",
			currency,
		}).format(value);
	}
	/**
	 * Returns the formatted value with the given unit as suffix.
	 *
	 * @param {number} value
	 * @param {string} unit
	 * @returns {string}
	 * @memberof Numeral
	 */
	formatAsUnit(value, unit) {
		return new Intl.NumberFormat(__classPrivateFieldGet(this, _Numeral_locale, "f"), {
			...__classPrivateFieldGet(this, _Numeral_options, "f"),
			...{ style: "unit", unit },
		}).format(value);
	}
}
exports.Numeral = Numeral;
(_Numeral_locale = new WeakMap()), (_Numeral_options = new WeakMap());
//# sourceMappingURL=numeral.js.map
