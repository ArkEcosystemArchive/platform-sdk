import Dinero from "dinero.js";
/**
 * Simplifies working with monetary values through Dinero.js
 *
 * @see https://dinerojs.com/
 *
 * @export
 * @class Money
 */
export declare class Money {
	#private;
	/**
	 * Creates an instance of Money.
	 *
	 * @param {*} options
	 * @memberof Money
	 */
	private constructor();
	/**
	 * Creates an instance of Money.
	 *
	 * @static
	 * @param {(string | number | Dinero.Dinero)} amount
	 * @param {string} currency
	 * @returns {Money}
	 * @memberof Money
	 */
	static make(amount: string | number | Dinero.Dinero, currency: string): Money;
	/**
	 * Returns a new instance with an embedded locale.
	 *
	 * @param {string} locale
	 * @returns {Money}
	 * @memberof Money
	 */
	setLocale(locale: string): Money;
	/**
	 * Returns a new instance that represents the sum of this and another instance.
	 *
	 * @param {Money} value
	 * @returns {Money}
	 * @memberof Money
	 */
	plus(value: Money): Money;
	/**
	 * Returns a new instance that represents the difference of this and another instance.
	 *
	 * @param {Money} value
	 * @returns {Money}
	 * @memberof Money
	 */
	minus(value: Money): Money;
	/**
	 * Returns a new instance that represents the multiplied value by the given factor.
	 *
	 * @param {number} value
	 * @returns {Money}
	 * @memberof Money
	 */
	times(value: number): Money;
	/**
	 * Returns a new instance that represents the divided value by the given factor.
	 *
	 * @param {number} value
	 * @returns {Money}
	 * @memberof Money
	 */
	divide(value: number): Money;
	/**
	 * Checks whether the value represented by this object equals to the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	isEqualTo(value: Money): boolean;
	/**
	 * Checks whether the value represented by this object is less than the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	isLessThan(value: Money): boolean;
	/**
	 * Checks whether the value represented by this object is less than or equal to the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	isLessThanOrEqual(value: Money): boolean;
	/**
	 * Checks whether the value represented by this object is greater than the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	isGreaterThan(value: Money): boolean;
	/**
	 * Checks whether the value represented by this object is greater than or equal to the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	isGreaterThanOrEqual(value: Money): boolean;
	/**
	 * Checks if the value represented by this object is positive.
	 *
	 * @returns {boolean}
	 * @memberof Money
	 */
	isPositive(): boolean;
	/**
	 * Checks if the value represented by this object is negative.
	 *
	 * @returns {boolean}
	 * @memberof Money
	 */
	isNegative(): boolean;
	/**
	 * Returns the amount.
	 *
	 * @returns {number}
	 * @memberof Money
	 */
	getAmount(): number;
	/**
	 * Returns the currency.
	 *
	 * @returns {*}
	 * @memberof Money
	 */
	getCurrency(): any;
	/**
	 * Returns this object formatted as a string.
	 *
	 * @param {(string | undefined)} [format]
	 * @returns {string}
	 * @memberof Money
	 */
	format(format?: string | undefined): string;
	/**
	 * Returns the amount represented by this object in units.
	 *
	 * @returns {number}
	 * @memberof Money
	 */
	toUnit(): number;
}
