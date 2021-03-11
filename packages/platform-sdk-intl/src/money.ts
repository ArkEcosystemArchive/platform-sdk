import Dinero from "dinero.js";

/**
 *
 *
 * @export
 * @class Money
 */
export class Money {
	/**
	 *
	 *
	 * @type {Dinero.Dinero}
	 * @memberof Money
	 */
	readonly #value: Dinero.Dinero;

	/**
	 *
	 *
	 * @type {string}
	 * @memberof Money
	 */
	readonly #currency: string;

	/**
	 *Creates an instance of Money.
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
	 *
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
	 *
	 *
	 * @param {string} locale
	 * @returns {Money}
	 * @memberof Money
	 */
	public setLocale(locale: string): Money {
		return Money.make(this.#value.setLocale(locale), this.#currency);
	}

	/**
	 *
	 *
	 * @param {Money} value
	 * @returns {Money}
	 * @memberof Money
	 */
	public plus(value: Money): Money {
		return Money.make(this.#value.add(this.toDinero(value)), this.#currency);
	}

	/**
	 *
	 *
	 * @param {Money} value
	 * @returns {Money}
	 * @memberof Money
	 */
	public minus(value: Money): Money {
		return Money.make(this.#value.subtract(this.toDinero(value)), this.#currency);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {Money}
	 * @memberof Money
	 */
	public times(value: number): Money {
		return Money.make(this.#value.multiply(value), this.#currency);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @returns {Money}
	 * @memberof Money
	 */
	public divide(value: number): Money {
		return Money.make(this.#value.divide(value), this.#currency);
	}

	/**
	 *
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	public isEqualTo(value: Money): boolean {
		return this.#value.equalsTo(this.toDinero(value));
	}

	/**
	 *
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	public isLessThan(value: Money): boolean {
		return this.#value.lessThan(this.toDinero(value));
	}

	/**
	 *
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	public isLessThanOrEqual(value: Money): boolean {
		return this.#value.lessThanOrEqual(this.toDinero(value));
	}

	/**
	 *
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	public isGreaterThan(value: Money): boolean {
		return this.#value.greaterThan(this.toDinero(value));
	}

	/**
	 *
	 *
	 * @param {Money} value
	 * @returns {boolean}
	 * @memberof Money
	 */
	public isGreaterThanOrEqual(value: Money): boolean {
		return this.#value.greaterThanOrEqual(this.toDinero(value));
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Money
	 */
	public isPositive(): boolean {
		return this.#value.isPositive();
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Money
	 */
	public isNegative(): boolean {
		return this.#value.isNegative();
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof Money
	 */
	public getAmount(): number {
		return this.#value.getAmount();
	}

	/**
	 *
	 *
	 * @returns {*}
	 * @memberof Money
	 */
	public getCurrency(): any {
		return this.#value.getCurrency();
	}

	/**
	 *
	 *
	 * @param {(string | undefined)} [format]
	 * @returns {string}
	 * @memberof Money
	 */
	public format(format?: string | undefined): string {
		return this.#value.toFormat(format);
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof Money
	 */
	public toUnit(): number {
		return this.#value.toUnit();
	}

	/**
	 *
	 *
	 * @private
	 * @param {Money} value
	 * @returns {Dinero.Dinero}
	 * @memberof Money
	 */
	private toDinero(value: Money): Dinero.Dinero {
		return Dinero({ amount: value.getAmount(), currency: value.getCurrency() });
	}
}
