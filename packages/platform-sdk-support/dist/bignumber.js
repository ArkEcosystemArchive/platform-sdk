"use strict";
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
var _BigNumber_instances, _BigNumber_value, _BigNumber_decimals, _BigNumber_toBigNumber;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigNumber = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const BigNumberClone = bignumber_js_1.default.clone({ DECIMAL_PLACES: 8, EXPONENTIAL_AT: 1e9 });
/**
 * An immutable BigNumber implementation wth some nice-to-have functionality
 * for working with crypto currencies throughout our products and use the SDK.
 *
 * This implementation is significantly slower than the native BigInt but for
 * applications that use the Platform SDK this performance loss is acceptable.
 *
 * @export
 * @class BigNumber
 */
class BigNumber {
	/**
	 * Creates an instance of BigNumber.
	 *
	 * @param {NumberLike} value
	 * @param {number} [decimals]
	 * @memberof BigNumber
	 */
	constructor(value, decimals) {
		_BigNumber_instances.add(this);
		/**
		 * The current value as a bignumber.js instance.
		 *
		 * @type {BigNumberJS}
		 * @memberof BigNumber
		 */
		_BigNumber_value.set(this, void 0);
		/**
		 * The number of decimals
		 *
		 * @type {number}
		 * @memberof BigNumber
		 */
		_BigNumber_decimals.set(this, void 0);
		__classPrivateFieldSet(
			this,
			_BigNumber_value,
			__classPrivateFieldGet(this, _BigNumber_instances, "m", _BigNumber_toBigNumber).call(this, value),
			"f",
		);
		if (decimals !== undefined) {
			__classPrivateFieldSet(this, _BigNumber_decimals, decimals, "f");
			__classPrivateFieldSet(
				this,
				_BigNumber_value,
				__classPrivateFieldGet(this, _BigNumber_value, "f").decimalPlaces(decimals),
				"f",
			);
		}
	}
	/**
	 * Creates an instance of BigNumber. Acts as a static constructor.
	 *
	 * @static
	 * @param {NumberLike} value
	 * @param {number} [decimals]
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	static make(value, decimals) {
		return new BigNumber(value, decimals);
	}
	/**
	 * Creates an instance of BigNumber with the given amount of decimals.
	 *
	 * @param {number} decimals
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	decimalPlaces(decimals) {
		return BigNumber.make(__classPrivateFieldGet(this, _BigNumber_value, "f"), decimals);
	}
	/**
	 * Creates an instance of BigNumber with the given value added to the current value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	plus(value) {
		return BigNumber.make(
			__classPrivateFieldGet(this, _BigNumber_value, "f").plus(
				__classPrivateFieldGet(this, _BigNumber_instances, "m", _BigNumber_toBigNumber).call(this, value),
			),
		);
	}
	/**
	 * Creates an instance of BigNumber with the given value subtracted from the current value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	minus(value) {
		return BigNumber.make(
			__classPrivateFieldGet(this, _BigNumber_value, "f").minus(
				__classPrivateFieldGet(this, _BigNumber_instances, "m", _BigNumber_toBigNumber).call(this, value),
			),
		);
	}
	/**
	 * Creates an instance of BigNumber with the current value divided by the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	divide(value) {
		return BigNumber.make(
			__classPrivateFieldGet(this, _BigNumber_value, "f").dividedBy(
				__classPrivateFieldGet(this, _BigNumber_instances, "m", _BigNumber_toBigNumber).call(this, value),
			),
		);
	}
	/**
	 * Creates an instance of BigNumber with the current value multiplied by the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	times(value) {
		return BigNumber.make(
			__classPrivateFieldGet(this, _BigNumber_value, "f").multipliedBy(
				__classPrivateFieldGet(this, _BigNumber_instances, "m", _BigNumber_toBigNumber).call(this, value),
			),
		);
	}
	/**
	 * Returns the sum of the different values.
	 *
	 * @param {NumberLike[]} values
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	static sum(values) {
		return values.reduce((accumulator, currentValue) => accumulator.plus(currentValue), BigNumber.ZERO);
	}
	/**
	 * Creates an instance of BigNumber that's a power of ten.
	 *
	 * @param {NumberLike} exponent
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	static powerOfTen(exponent) {
		const power = BigNumber.make(exponent).toNumber();
		return BigNumber.make(`1${"0".repeat(power)}`);
	}
	/**
	 * Determines if the current value is NaN.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isNaN() {
		return __classPrivateFieldGet(this, _BigNumber_value, "f").isNaN();
	}
	/**
	 * Determines if the current value is positive.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isPositive() {
		return __classPrivateFieldGet(this, _BigNumber_value, "f").isPositive();
	}
	/**
	 * Determines if the current value is negative.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isNegative() {
		return __classPrivateFieldGet(this, _BigNumber_value, "f").isNegative();
	}
	/**
	 * Determines if the current value is finite.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isFinite() {
		return __classPrivateFieldGet(this, _BigNumber_value, "f").isFinite();
	}
	/**
	 * Determines if the current value is zero.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isZero() {
		return __classPrivateFieldGet(this, _BigNumber_value, "f").isZero();
	}
	/**
	 * Compares the current and given value and returns a numerical value
	 * to indicate the type of difference, like less/greater or equal.
	 *
	 * @param {NumberLike} value
	 * @returns {number}
	 * @memberof BigNumber
	 */
	comparedTo(value) {
		return __classPrivateFieldGet(this, _BigNumber_value, "f").comparedTo(
			__classPrivateFieldGet(this, _BigNumber_instances, "m", _BigNumber_toBigNumber).call(this, value),
		);
	}
	/**
	 * Determines if the current value is equal to the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isEqualTo(value) {
		return __classPrivateFieldGet(this, _BigNumber_value, "f").isEqualTo(
			__classPrivateFieldGet(this, _BigNumber_instances, "m", _BigNumber_toBigNumber).call(this, value),
		);
	}
	/**
	 * Determines if the current value is greater than the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isGreaterThan(value) {
		return __classPrivateFieldGet(this, _BigNumber_value, "f").isGreaterThan(
			__classPrivateFieldGet(this, _BigNumber_instances, "m", _BigNumber_toBigNumber).call(this, value),
		);
	}
	/**
	 * Determines if the current value is greater than or equal to the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isGreaterThanOrEqualTo(value) {
		return __classPrivateFieldGet(this, _BigNumber_value, "f").isGreaterThanOrEqualTo(
			__classPrivateFieldGet(this, _BigNumber_instances, "m", _BigNumber_toBigNumber).call(this, value),
		);
	}
	/**
	 * Determines if the current value is less than the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isLessThan(value) {
		return __classPrivateFieldGet(this, _BigNumber_value, "f").isLessThan(
			__classPrivateFieldGet(this, _BigNumber_instances, "m", _BigNumber_toBigNumber).call(this, value),
		);
	}
	/**
	 * Determines if the current value is less than or equal to the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isLessThanOrEqualTo(value) {
		return __classPrivateFieldGet(this, _BigNumber_value, "f").isLessThanOrEqualTo(
			__classPrivateFieldGet(this, _BigNumber_instances, "m", _BigNumber_toBigNumber).call(this, value),
		);
	}
	/**
	 * Returns a BigNumber as expressed naturally in the given amount of decimals.
	 *
	 * @param {number} [decimals]
	 * @returns {string}
	 * @memberof BigNumber
	 */
	denominated(decimals) {
		decimals !== null && decimals !== void 0
			? decimals
			: (decimals = __classPrivateFieldGet(this, _BigNumber_decimals, "f"));
		return BigNumber.make(__classPrivateFieldGet(this, _BigNumber_value, "f"), decimals).divide(
			BigNumber.powerOfTen(decimals || 0),
		);
	}
	/**
	 * Returns a BigNumber expressed in the smallest unit
	 *
	 * @param {number} [decimals]
	 * @returns {string}
	 * @memberof BigNumber
	 */
	toSatoshi(decimals) {
		decimals !== null && decimals !== void 0
			? decimals
			: (decimals = __classPrivateFieldGet(this, _BigNumber_decimals, "f"));
		return BigNumber.make(__classPrivateFieldGet(this, _BigNumber_value, "f"), decimals).times(
			BigNumber.powerOfTen(decimals || 0),
		);
	}
	/**
	 * Divides the current value by one satoshi and rounds it to the given amount of decimals.
	 *
	 * @param {number} [decimals]
	 * @returns {string}
	 * @memberof BigNumber
	 */
	toHuman(decimals) {
		return this.denominated(decimals).toString();
	}
	/**
	 * Returns a string representing the current value rounded to the given amount of decimals.
	 *
	 * @param {number} [decimals]
	 * @returns {string}
	 * @memberof BigNumber
	 */
	toFixed(decimals) {
		if (decimals !== undefined) {
			return __classPrivateFieldGet(this, _BigNumber_value, "f").toFixed(decimals);
		}
		return __classPrivateFieldGet(this, _BigNumber_value, "f").toFixed();
	}
	/**
	 * Returns the current value as a primitive number.
	 *
	 * @returns {number}
	 * @memberof BigNumber
	 */
	toNumber() {
		return __classPrivateFieldGet(this, _BigNumber_value, "f").toNumber();
	}
	/**
	 * Returns the current value as primitive string.
	 *
	 * @returns {string}
	 * @memberof BigNumber
	 */
	toString() {
		return __classPrivateFieldGet(this, _BigNumber_value, "f").toString();
	}
	/**
	 * Returns the current value as a string but includes minus symbols.
	 *
	 * @returns {string}
	 * @memberof BigNumber
	 */
	valueOf() {
		return __classPrivateFieldGet(this, _BigNumber_value, "f").valueOf();
	}
}
exports.BigNumber = BigNumber;
(_BigNumber_value = new WeakMap()),
	(_BigNumber_decimals = new WeakMap()),
	(_BigNumber_instances = new WeakSet()),
	(_BigNumber_toBigNumber = function _BigNumber_toBigNumber(value) {
		if (value instanceof BigNumber) {
			return new BigNumberClone(value.valueOf());
		}
		return new BigNumberClone(value);
	});
/**
 * Quick accessor for 0, a commonly used value.
 *
 * @static
 * @type {BigNumber}
 * @memberof BigNumber
 */
Object.defineProperty(BigNumber, "ZERO", {
	enumerable: true,
	configurable: true,
	writable: true,
	value: new BigNumber(0),
});
/**
 * Quick accessor for 1, a commonly used value.
 *
 * @static
 * @type {BigNumber}
 * @memberof BigNumber
 */
Object.defineProperty(BigNumber, "ONE", {
	enumerable: true,
	configurable: true,
	writable: true,
	value: new BigNumber(1),
});
//# sourceMappingURL=bignumber.js.map
