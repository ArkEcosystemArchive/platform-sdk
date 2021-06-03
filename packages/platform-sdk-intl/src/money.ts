import Dinero from "dinero.js";

/**
 * Simplifies working with monetary values through Dinero.js
 *
 * @see https://dinerojs.com/
 *
 * @export
 * @class Money
 */
export class Money {
	/**
	 * The value that is being represented.
	 *
	 * @type {Dinero.Dinero}
	 * @memberof Money
	 */
	readonly #value: Dinero.Dinero;

	/**
	 * The currency that is used for formatting.
	 *
	 * @type {string}
	 * @memberof Money
	 */
	readonly #currency: string;

	/**
	 * Creates an instance of Money.
	 *
	 * @param {*} options
	 * @memberof Money
	 */
	private constructor(options) {
		if (!Number.isInteger(options.amount)) {
			options.amount = options.amount.getAmount();
		}

		this.#value = Dinero(options);
		this.#currency = options.currency;
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
	public static make(amount: string | number | Dinero.Dinero, currency: string): Money {
		return new Money({ amount, currency });
	}

	/**
	 * Returns a new instance with an embedded locale.
	 *
	 * @param {string} locale
	 * @returns {Money}
	 * @memberof Money
	 */
	public setLocale(locale: string): Money {
		return Money.make(this.#value.setLocale(locale), this.#currency);
	}

	/**
	 * Returns a new instance that represents the sum of this and another instance.
	 *
	 * @param {Money} value
	 * @returns {Money}
	 * @memberof Money
	 */
	public plus(value: Money): Money {
		return Money.make(this.#value.add(this.#toDinero(value)), this.#currency);
	}

	/**
	 * Returns a new instance that represents the difference of this and another instance.
	 *
	 * @param {Money} value
	 * @returns {Money}
	 * @memberof Money
	 */
	public minus(value: Money): Money {
		return Money.make(this.#value.subtract(this.#toDinero(value)), this.#currency);
	}

	/**
	 * Returns a new instance that represents the multiplied value by the given factor.
	 *
	 * @param {number} value
	 * @returns {Money}
	 * @memberof Money
	 */
	public times(value: number): Money {
		return Money.make(this.#value.multiply(value), this.#currency);
	}

	/**
	 * Returns a new instance that represents the divided value by the given factor.
	 *
	 * @param {number} value
	 * @returns {Money}
	 * @memberof Money
	 */
	public divide(value: number): Money {
		return Money.make(this.#value.divide(value), this.#currency);
	}

	/**
	 * Checks whether the value represented by this object equals to the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	public isEqualTo(value: Money): boolean {
		return this.#value.equalsTo(this.#toDinero(value));
	}

	/**
	 * Checks whether the value represented by this object is less than the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	public isLessThan(value: Money): boolean {
		return this.#value.lessThan(this.#toDinero(value));
	}

	/**
	 * Checks whether the value represented by this object is less than or equal to the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	public isLessThanOrEqual(value: Money): boolean {
		return this.#value.lessThanOrEqual(this.#toDinero(value));
	}

	/**
	 * Checks whether the value represented by this object is greater than the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	public isGreaterThan(value: Money): boolean {
		return this.#value.greaterThan(this.#toDinero(value));
	}

	/**
	 * Checks whether the value represented by this object is greater than or equal to the other.
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	public isGreaterThanOrEqual(value: Money): boolean {
		return this.#value.greaterThanOrEqual(this.#toDinero(value));
	}

	/**
	 * Checks if the value represented by this object is positive.
	 *
	 * @returns {boolean}
	 * @memberof Money
	 */
	public isPositive(): boolean {
		return this.#value.isPositive();
	}

	/**
	 * Checks if the value represented by this object is negative.
	 *
	 * @returns {boolean}
	 * @memberof Money
	 */
	public isNegative(): boolean {
		return this.#value.isNegative();
	}

	/**
	 * Returns the amount.
	 *
	 * @returns {number}
	 * @memberof Money
	 */
	public getAmount(): number {
		return this.#value.getAmount();
	}

	/**
	 * Returns the currency.
	 *
	 * @returns {*}
	 * @memberof Money
	 */
	public getCurrency(): any {
		return this.#value.getCurrency();
	}

	/**
	 * Returns this object formatted as a string.
	 *
	 * @param {(string | undefined)} [format]
	 * @returns {string}
	 * @memberof Money
	 */
	public format(format?: string | undefined): string {
		return this.#value.toFormat(format);
	}

	/**
	 * Returns the amount represented by this object in units.
	 *
	 * @returns {number}
	 * @memberof Money
	 */
	public toUnit(): number {
		return this.#value.toUnit();
	}

	/**
	 * Returns the amount represented by this object as a Dinero instance.
	 *
	 * @private
	 * @param {Money} value
	 * @returns {Dinero.Dinero}
	 * @memberof Money
	 */
	#toDinero(value: Money): Dinero.Dinero {
		return Dinero({ amount: value.getAmount(), currency: value.getCurrency() });
	}
}
