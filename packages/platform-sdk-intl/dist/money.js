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
var _Money_instances, _Money_value, _Money_currency, _Money_toDinero;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = void 0;
const dinero_js_1 = __importDefault(require("dinero.js"));
/**
 * Simplifies working with monetary values through Dinero.js
 *
 * @see https://dinerojs.com/
 *
 * @export
 * @class Money
 */
class Money {
	/**
	 * Creates an instance of Money.
	 *
	 * @param {*} options
	 * @memberof Money
	 */
	constructor(options) {
		_Money_instances.add(this);
		/**
		 * The value that is being represented.
		 *
		 * @type {Dinero.Dinero}
		 * @memberof Money
		 */
		_Money_value.set(this, void 0);
		/**
		 * The currency that is used for formatting.
		 *
		 * @type {string}
		 * @memberof Money
		 */
		_Money_currency.set(this, void 0);
		if (!Number.isInteger(options.amount)) {
			options.amount = options.amount.getAmount();
		}
		__classPrivateFieldSet(this, _Money_value, dinero_js_1.default(options), "f");
		__classPrivateFieldSet(this, _Money_currency, options.currency, "f");
	}
	/**
	 * Creates an instance of Money.
	 *
	 * @static
	 * @param {(string | number | Dinero.Dinero)} amount
	 * @param {string} currency
	 * @returns {Money}
	 * @memberof Money
	 */
	static make(amount, currency) {
		return new Money({ amount, currency });
	}
	/**
	 * Returns a new instance with an embedded locale.
	 *
	 * @param {string} locale
	 * @returns {Money}
	 * @memberof Money
	 */
	setLocale(locale) {
		return Money.make(
			__classPrivateFieldGet(this, _Money_value, "f").setLocale(locale),
			__classPrivateFieldGet(this, _Money_currency, "f"),
		);
	}
	/**
	 * Returns a new instance that represents the sum of this and another instance.
	 *
	 * @param {Money} value
	 * @returns {Money}
	 * @memberof Money
	 */
	plus(value) {
		return Money.make(
			__classPrivateFieldGet(this, _Money_value, "f").add(
				__classPrivateFieldGet(this, _Money_instances, "m", _Money_toDinero).call(this, value),
			),
			__classPrivateFieldGet(this, _Money_currency, "f"),
		);
	}
	/**
	 * Returns a new instance that represents the difference of this and another instance.
	 *
	 * @param {Money} value
	 * @returns {Money}
	 * @memberof Money
	 */
	minus(value) {
		return Money.make(
			__classPrivateFieldGet(this, _Money_value, "f").subtract(
				__classPrivateFieldGet(this, _Money_instances, "m", _Money_toDinero).call(this, value),
			),
			__classPrivateFieldGet(this, _Money_currency, "f"),
		);
	}
	/**
	 * Returns a new instance that represents the multiplied value by the given factor.
	 *
	 * @param {number} value
	 * @returns {Money}
	 * @memberof Money
	 */
	times(value) {
		return Money.make(
			__classPrivateFieldGet(this, _Money_value, "f").multiply(value),
			__classPrivateFieldGet(this, _Money_currency, "f"),
		);
	}
	/**
	 * Returns a new instance that represents the divided value by the given factor.
	 *
	 * @param {number} value
	 * @returns {Money}
	 * @memberof Money
	 */
	divide(value) {
		return Money.make(
			__classPrivateFieldGet(this, _Money_value, "f").divide(value),
			__classPrivateFieldGet(this, _Money_currency, "f"),
		);
	}
	/**
	 * Checks whether the value represented by this object equals to the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	isEqualTo(value) {
		return __classPrivateFieldGet(this, _Money_value, "f").equalsTo(
			__classPrivateFieldGet(this, _Money_instances, "m", _Money_toDinero).call(this, value),
		);
	}
	/**
	 * Checks whether the value represented by this object is less than the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	isLessThan(value) {
		return __classPrivateFieldGet(this, _Money_value, "f").lessThan(
			__classPrivateFieldGet(this, _Money_instances, "m", _Money_toDinero).call(this, value),
		);
	}
	/**
	 * Checks whether the value represented by this object is less than or equal to the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	isLessThanOrEqual(value) {
		return __classPrivateFieldGet(this, _Money_value, "f").lessThanOrEqual(
			__classPrivateFieldGet(this, _Money_instances, "m", _Money_toDinero).call(this, value),
		);
	}
	/**
	 * Checks whether the value represented by this object is greater than the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	isGreaterThan(value) {
		return __classPrivateFieldGet(this, _Money_value, "f").greaterThan(
			__classPrivateFieldGet(this, _Money_instances, "m", _Money_toDinero).call(this, value),
		);
	}
	/**
	 * Checks whether the value represented by this object is greater than or equal to the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	isGreaterThanOrEqual(value) {
		return __classPrivateFieldGet(this, _Money_value, "f").greaterThanOrEqual(
			__classPrivateFieldGet(this, _Money_instances, "m", _Money_toDinero).call(this, value),
		);
	}
	/**
	 * Checks if the value represented by this object is positive.
	 *
	 * @returns {boolean}
	 * @memberof Money
	 */
	isPositive() {
		return __classPrivateFieldGet(this, _Money_value, "f").isPositive();
	}
	/**
	 * Checks if the value represented by this object is negative.
	 *
	 * @returns {boolean}
	 * @memberof Money
	 */
	isNegative() {
		return __classPrivateFieldGet(this, _Money_value, "f").isNegative();
	}
	/**
	 * Returns the amount.
	 *
	 * @returns {number}
	 * @memberof Money
	 */
	getAmount() {
		return __classPrivateFieldGet(this, _Money_value, "f").getAmount();
	}
	/**
	 * Returns the currency.
	 *
	 * @returns {*}
	 * @memberof Money
	 */
	getCurrency() {
		return __classPrivateFieldGet(this, _Money_value, "f").getCurrency();
	}
	/**
	 * Returns this object formatted as a string.
	 *
	 * @param {(string | undefined)} [format]
	 * @returns {string}
	 * @memberof Money
	 */
	format(format) {
		return __classPrivateFieldGet(this, _Money_value, "f").toFormat(format);
	}
	/**
	 * Returns the amount represented by this object in units.
	 *
	 * @returns {number}
	 * @memberof Money
	 */
	toUnit() {
		return __classPrivateFieldGet(this, _Money_value, "f").toUnit();
	}
}
exports.Money = Money;
(_Money_value = new WeakMap()),
	(_Money_currency = new WeakMap()),
	(_Money_instances = new WeakSet()),
	(_Money_toDinero = function _Money_toDinero(value) {
		return dinero_js_1.default({ amount: value.getAmount(), currency: value.getCurrency() });
	});
//# sourceMappingURL=money.js.map
