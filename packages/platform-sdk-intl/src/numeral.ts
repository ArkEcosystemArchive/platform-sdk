/**
 * Implements helpers for numerical formatting with currencies and unit.
 *
 * @export
 * @class Numeral
 */
export class Numeral {
	/**
	 * The locale that will be used for formatting.
	 *
	 * @type {string}
	 * @memberof Numeral
	 */
	readonly #locale: string;

	/**
	 * The options that should be used for formatting.
	 *
	 * @type {Intl.NumberFormatOptions}
	 * @memberof Numeral
	 */
	readonly #options: Intl.NumberFormatOptions;

	/**
	 * Creates an instance of Numeral.
	 *
	 * @param {string} locale
	 * @param {Intl.NumberFormatOptions} [options]
	 * @memberof Numeral
	 */
	private constructor(locale: string, options?: Intl.NumberFormatOptions) {
		this.#locale = locale;
		this.#options = options || {};
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
	public static make(locale: string, options?: Intl.NumberFormatOptions): Numeral {
		return new Numeral(locale, options);
	}

	/**
	 * Returns the formatted value.
	 *
	 * @param {number} value
	 * @returns {string}
	 * @memberof Numeral
	 */
	public format(value: number): string {
		return new Intl.NumberFormat(this.#locale).format(value);
	}

	/**
	 * Returns the formatted value with the given currency as suffix.
	 *
	 * @param {number} value
	 * @param {string} currency
	 * @returns {string}
	 * @memberof Numeral
	 */
	public formatAsCurrency(value: number, currency: string): string {
		return new Intl.NumberFormat(this.#locale, {
			...this.#options,
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
	public formatAsUnit(value: number, unit: string): string {
		return new Intl.NumberFormat(this.#locale, {
			...this.#options,
			...{ style: "unit", unit },
		}).format(value);
	}
}
