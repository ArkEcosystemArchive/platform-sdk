/**
 * Implements helpers for numerical formatting with currencies and unit.
 *
 * @export
 * @class Numeral
 */
export declare class Numeral {
	#private;
	/**
	 * Creates an instance of Numeral.
	 *
	 * @param {string} locale
	 * @param {Intl.NumberFormatOptions} [options]
	 * @memberof Numeral
	 */
	private constructor();
	/**
	 * Creates an instance of Numeral.
	 *
	 * @static
	 * @param {string} locale
	 * @param {Intl.NumberFormatOptions} [options]
	 * @returns {Numeral}
	 * @memberof Numeral
	 */
	static make(locale: string, options?: Intl.NumberFormatOptions): Numeral;
	/**
	 * Returns the formatted value.
	 *
	 * @param {number} value
	 * @returns {string}
	 * @memberof Numeral
	 */
	format(value: number): string;
	/**
	 * Returns the formatted value with the given currency as suffix.
	 *
	 * @param {number} value
	 * @param {string} currency
	 * @returns {string}
	 * @memberof Numeral
	 */
	formatAsCurrency(value: number, currency: string): string;
	/**
	 * Returns the formatted value with the given unit as suffix.
	 *
	 * @param {number} value
	 * @param {string} unit
	 * @returns {string}
	 * @memberof Numeral
	 */
	formatAsUnit(value: number, unit: string): string;
}
