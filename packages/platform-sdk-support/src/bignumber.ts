import BigNumberJS from "bignumber.js";

export type NumberLike = string | number | BigNumberJS | BigNumber;

const BigNumberClone = BigNumberJS.clone({ DECIMAL_PLACES: 8, EXPONENTIAL_AT: 1e9 });

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
export class BigNumber {
	/**
	 * Quick accessor for 0, a commonly used value.
	 *
	 * @static
	 * @type {BigNumber}
	 * @memberof BigNumber
	 */
	public static readonly ZERO: BigNumber = new BigNumber(0);

	/**
	 * Quick accessor for 1, a commonly used value.
	 *
	 * @static
	 * @type {BigNumber}
	 * @memberof BigNumber
	 */
	public static readonly ONE: BigNumber = new BigNumber(1);

	/**
	 * The current value as a bignumber.js instance.
	 *
	 * @type {BigNumberJS}
	 * @memberof BigNumber
	 */
	readonly #value: BigNumberJS;

	/**
	 * The number of decimals
	 *
	 * @type {number}
	 * @memberof BigNumber
	 */
	readonly #decimals: number | undefined;

	/**
	 * Creates an instance of BigNumber.
	 *
	 * @param {NumberLike} value
	 * @param {number} [decimals]
	 * @memberof BigNumber
	 */
	private constructor(value: NumberLike, decimals?: number) {
		this.#value = this.#toBigNumber(value);

		if (decimals !== undefined) {
			this.#decimals = decimals;
			this.#value = this.#value.decimalPlaces(decimals);
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
	public static make(value: NumberLike, decimals?: number): BigNumber {
		return new BigNumber(value, decimals);
	}

	/**
	 * Creates an instance of BigNumber with the given amount of decimals.
	 *
	 * @param {number} decimals
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public decimalPlaces(decimals: number): BigNumber {
		return BigNumber.make(this.#value, decimals);
	}

	/**
	 * Creates an instance of BigNumber with the given value added to the current value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public plus(value: NumberLike): BigNumber {
		return BigNumber.make(this.#value.plus(this.#toBigNumber(value)));
	}

	/**
	 * Creates an instance of BigNumber with the given value subtracted from the current value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public minus(value: NumberLike): BigNumber {
		return BigNumber.make(this.#value.minus(this.#toBigNumber(value)));
	}

	/**
	 * Creates an instance of BigNumber with the current value divided by the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public divide(value: NumberLike): BigNumber {
		return BigNumber.make(this.#value.dividedBy(this.#toBigNumber(value)));
	}

	/**
	 * Creates an instance of BigNumber with the current value multiplied by the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public times(value: NumberLike): BigNumber {
		return BigNumber.make(this.#value.multipliedBy(this.#toBigNumber(value)));
	}

	/**
	 * Returns the sum of the different values.
	 *
	 * @param {NumberLike[]} values
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public static sum(values: NumberLike[]): BigNumber {
		return values.reduce(
			(accumulator: BigNumber, currentValue: NumberLike) => accumulator.plus(currentValue),
			BigNumber.ZERO,
		);
	}

	/**
	 * Creates an instance of BigNumber that's a power of ten.
	 *
	 * @param {NumberLike} exponent
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public static powerOfTen(exponent: NumberLike): BigNumber {
		const power = BigNumber.make(exponent).toNumber();
		return BigNumber.make(`1${"0".repeat(power)}`);
	}

	/**
	 * Determines if the current value is NaN.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isNaN(): boolean {
		return this.#value.isNaN();
	}

	/**
	 * Determines if the current value is positive.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isPositive(): boolean {
		return this.#value.isPositive();
	}

	/**
	 * Determines if the current value is negative.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isNegative(): boolean {
		return this.#value.isNegative();
	}

	/**
	 * Determines if the current value is finite.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isFinite(): boolean {
		return this.#value.isFinite();
	}

	/**
	 * Determines if the current value is zero.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isZero(): boolean {
		return this.#value.isZero();
	}

	/**
	 * Compares the current and given value and returns a numerical value
	 * to indicate the type of difference, like less/greater or equal.
	 *
	 * @param {NumberLike} value
	 * @returns {number}
	 * @memberof BigNumber
	 */
	public comparedTo(value: NumberLike): number {
		return this.#value.comparedTo(this.#toBigNumber(value));
	}

	/**
	 * Determines if the current value is equal to the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isEqualTo(value: NumberLike): boolean {
		return this.#value.isEqualTo(this.#toBigNumber(value));
	}

	/**
	 * Determines if the current value is greater than the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isGreaterThan(value: NumberLike): boolean {
		return this.#value.isGreaterThan(this.#toBigNumber(value));
	}

	/**
	 * Determines if the current value is greater than or equal to the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isGreaterThanOrEqualTo(value: NumberLike): boolean {
		return this.#value.isGreaterThanOrEqualTo(this.#toBigNumber(value));
	}

	/**
	 * Determines if the current value is less than the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isLessThan(value: NumberLike): boolean {
		return this.#value.isLessThan(this.#toBigNumber(value));
	}

	/**
	 * Determines if the current value is less than or equal to the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isLessThanOrEqualTo(value: NumberLike): boolean {
		return this.#value.isLessThanOrEqualTo(this.#toBigNumber(value));
	}

	/**
	 * Divides the current value by one satoshi and rounds it to the given amount of decimals.
	 *
	 * @param {number} [decimals]
	 * @returns {string}
	 * @memberof BigNumber
	 */
	public toHuman(decimals?: number): string {
		decimals ??= this.#decimals;
		return BigNumber.make(this.#value, decimals)
			.divide(BigNumber.powerOfTen(decimals || 0))
			.toString();
	}

	/**
	 * Returns a string representing the current value rounded to the given amount of decimals.
	 *
	 * @param {number} [decimals]
	 * @returns {string}
	 * @memberof BigNumber
	 */
	public toFixed(decimals?: number): string {
		if (decimals !== undefined) {
			return this.#value.toFixed(decimals);
		}

		return this.#value.toFixed();
	}

	/**
	 * Returns the current value as a primitive number.
	 *
	 * @returns {number}
	 * @memberof BigNumber
	 */
	public toNumber(): number {
		return this.#value.toNumber();
	}

	/**
	 * Returns the current value as primitive string.
	 *
	 * @returns {string}
	 * @memberof BigNumber
	 */
	public toString(): string {
		return this.#value.toString();
	}

	/**
	 * Returns the current value as a string but includes minus symbols.
	 *
	 * @returns {string}
	 * @memberof BigNumber
	 */
	public valueOf(): string {
		return this.#value.valueOf();
	}

	/**
	 * Normalise the various types of input.
	 *
	 * @private
	 * @param {NumberLike} value
	 * @returns {BigNumberJS}
	 * @memberof BigNumber
	 */
	#toBigNumber(value: NumberLike): BigNumberJS {
		if (value instanceof BigNumber) {
			return new BigNumberClone(value.valueOf());
		}

		return new BigNumberClone(value);
	}
}
