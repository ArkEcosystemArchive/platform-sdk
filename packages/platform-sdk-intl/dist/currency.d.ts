/**
 * Implements the normalisation of any currency-like string.
 *
 * @export
 * @class Currency
 */
export declare class Currency {
	/**
	 * Normalise the given vallue using the given magnitude.
	 *
	 * @static
	 * @param {string} valueString
	 * @param {number} [magnitude=8]
	 * @param {string} [locale]
	 * @returns {{
	 * 		display: string;
	 * 		value?: string;
	 * 	}}
	 * @memberof Currency
	 */
	static fromString(
		valueString: string,
		magnitude?: number,
		locale?: string,
	): {
		display: string;
		value?: string;
	};
}
