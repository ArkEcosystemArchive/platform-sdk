/**
 *
 *
 * @export
 * @class Bcrypt
 */
export declare class Bcrypt {
	/**
	 *
	 *
	 * @static
	 * @param {string} value
	 * @returns {string}
	 * @memberof Bcrypt
	 */
	static hash(value: string): string;
	/**
	 *
	 *
	 * @static
	 * @param {string} hash
	 * @param {string} password
	 * @returns {boolean}
	 * @memberof Bcrypt
	 */
	static verify(hash: string, password: string): boolean;
}
