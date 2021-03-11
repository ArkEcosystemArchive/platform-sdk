/**
 *
 *
 * @export
 * @class Numeral
 */
export class Numeral {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof Numeral
	 */
	readonly #locale: string;

	/**
	*
	*
	* @type {Intl.NumberFormatOptions}
	* @memberof Numeral
	*/
	readonly #options: Intl.NumberFormatOptions;

	/**
	 *Creates an instance of Numeral.
	 * @param {string} locale
	 * @param {Intl.NumberFormatOptions} [options]
	 * @memberof Numeral
	 */
	private constructor(locale: string, options?: Intl.NumberFormatOptions) {
		this.#locale = locale;
		this.#options = options || {};
	}

	/**
	 *
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
	 *
	 *
	 * @param {number} value
	 * @returns {string}
	 * @memberof Numeral
	 */
	public format(value: number): string {
		return new Intl.NumberFormat(this.#locale).format(value);
	}

	/**
	 *
	 *
	 * @param {number} value
	 * @param {string} currency
	 * @returns {string}
	 * @memberof Numeral
	 */
	public formatAsCurrency(value: number, currency: string): string {
		return new Intl.NumberFormat(this.#locale, {
			...this.#options,
			...{ style: "currency", currency },
		}).format(value);
	}

	/**
	 *
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
