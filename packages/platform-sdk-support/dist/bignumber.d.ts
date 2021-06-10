import BigNumberJS from "bignumber.js";
export declare type NumberLike = string | number | BigNumberJS | BigNumber;
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
export declare class BigNumber {
	#private;
	/**
	 * Quick accessor for 0, a commonly used value.
	 *
	 * @static
	 * @type {BigNumber}
	 * @memberof BigNumber
	 */
	static readonly ZERO: BigNumber;
	/**
	 * Quick accessor for 1, a commonly used value.
	 *
	 * @static
	 * @type {BigNumber}
	 * @memberof BigNumber
	 */
	static readonly ONE: BigNumber;
	/**
	 * Creates an instance of BigNumber.
	 *
	 * @param {NumberLike} value
	 * @param {number} [decimals]
	 * @memberof BigNumber
	 */
	private constructor();
	/**
	 * Creates an instance of BigNumber. Acts as a static constructor.
	 *
	 * @static
	 * @param {NumberLike} value
	 * @param {number} [decimals]
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	static make(value: NumberLike, decimals?: number): BigNumber;
	/**
	 * Creates an instance of BigNumber with the given amount of decimals.
	 *
	 * @param {number} decimals
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	decimalPlaces(decimals: number): BigNumber;
	/**
	 * Creates an instance of BigNumber with the given value added to the current value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	plus(value: NumberLike): BigNumber;
	/**
	 * Creates an instance of BigNumber with the given value subtracted from the current value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	minus(value: NumberLike): BigNumber;
	/**
	 * Creates an instance of BigNumber with the current value divided by the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	divide(value: NumberLike): BigNumber;
	/**
	 * Creates an instance of BigNumber with the current value multiplied by the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	times(value: NumberLike): BigNumber;
	/**
	 * Returns the sum of the different values.
	 *
	 * @param {NumberLike[]} values
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	static sum(values: NumberLike[]): BigNumber;
	/**
	 * Creates an instance of BigNumber that's a power of ten.
	 *
	 * @param {NumberLike} exponent
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	static powerOfTen(exponent: NumberLike): BigNumber;
	/**
	 * Determines if the current value is NaN.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isNaN(): boolean;
	/**
	 * Determines if the current value is positive.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isPositive(): boolean;
	/**
	 * Determines if the current value is negative.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isNegative(): boolean;
	/**
	 * Determines if the current value is finite.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isFinite(): boolean;
	/**
	 * Determines if the current value is zero.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isZero(): boolean;
	/**
	 * Compares the current and given value and returns a numerical value
	 * to indicate the type of difference, like less/greater or equal.
	 *
	 * @param {NumberLike} value
	 * @returns {number}
	 * @memberof BigNumber
	 */
	comparedTo(value: NumberLike): number;
	/**
	 * Determines if the current value is equal to the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isEqualTo(value: NumberLike): boolean;
	/**
	 * Determines if the current value is greater than the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isGreaterThan(value: NumberLike): boolean;
	/**
	 * Determines if the current value is greater than or equal to the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isGreaterThanOrEqualTo(value: NumberLike): boolean;
	/**
	 * Determines if the current value is less than the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isLessThan(value: NumberLike): boolean;
	/**
	 * Determines if the current value is less than or equal to the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	isLessThanOrEqualTo(value: NumberLike): boolean;
	/**
	 * Returns a BigNumber as expressed naturally in the given amount of decimals.
	 *
	 * @param {number} [decimals]
	 * @returns {string}
	 * @memberof BigNumber
	 */
	denominated(decimals?: number): BigNumber;
	/**
	 * Returns a BigNumber expressed in the smallest unit
	 *
	 * @param {number} [decimals]
	 * @returns {string}
	 * @memberof BigNumber
	 */
	toSatoshi(decimals?: number): BigNumber;
	/**
	 * Divides the current value by one satoshi and rounds it to the given amount of decimals.
	 *
	 * @param {number} [decimals]
	 * @returns {string}
	 * @memberof BigNumber
	 */
	toHuman(decimals?: number): string;
	/**
	 * Returns a string representing the current value rounded to the given amount of decimals.
	 *
	 * @param {number} [decimals]
	 * @returns {string}
	 * @memberof BigNumber
	 */
	toFixed(decimals?: number): string;
	/**
	 * Returns the current value as a primitive number.
	 *
	 * @returns {number}
	 * @memberof BigNumber
	 */
	toNumber(): number;
	/**
	 * Returns the current value as primitive string.
	 *
	 * @returns {string}
	 * @memberof BigNumber
	 */
	toString(): string;
	/**
	 * Returns the current value as a string but includes minus symbols.
	 *
	 * @returns {string}
	 * @memberof BigNumber
	 */
	valueOf(): string;
}
