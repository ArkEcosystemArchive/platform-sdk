/**
 *
 *
 * @export
 * @class AES
 */
export declare class AES {
	static encrypt(message: string, password: string, salt: string, iv: string): string;
	/**
	 *
	 *
	 * @static
	 * @param {string} cipherText
	 * @param {string} password
	 * @param {string} salt
	 * @param {string} iv
	 * @returns {string}
	 * @memberof AES
	 */
	static decrypt(cipherText: string, password: string, salt: string, iv: string): string;
}
