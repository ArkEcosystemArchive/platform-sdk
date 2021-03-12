import StringCrypto from "string-crypto";

/**
 *
 * @see {@link https://en.wikipedia.org/wiki/PBKDF2}
 *
 * @export
 * @class PBKDF2
 */
export class PBKDF2 {
	/**
	 *
	 *
	 * @static
	 * @param {string} value
	 * @param {string} password
	 * @returns {string}
	 * @memberof PBKDF2
	 */
	public static encrypt(value: string, password: string): string {
		return new StringCrypto().encryptString(value, password);
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} value
	 * @param {string} password
	 * @returns {string}
	 * @memberof PBKDF2
	 */
	public static decrypt(value: string, password: string): string {
		return new StringCrypto().decryptString(value, password);
	}
}
