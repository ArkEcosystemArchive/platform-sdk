/**
 * Implements all functionality that is required to work with the Argon2
 * key derivation and password hashing algorithm as defined by the specs.
 *
 * @see {@link https://en.wikipedia.org/wiki/Argon2}
 *
 * @export
 * @class Argon2
 */
export declare class Argon2 {
	/**
	 * Hashes the given value with a random salt.
	 *
	 * @static
	 * @param {string} value
	 * @returns {Promise<string>}
	 * @memberof Argon2
	 */
	static hash(value: string): Promise<string>;
	/**
	 * Verifies that the given hash and password match.
	 *
	 * @remarks
	 * A match in the has and password should be interpreted as ownership
	 * of whatever resource is protected by the given hash and password.
	 *
	 * @static
	 * @param {string} hash
	 * @param {string} password
	 * @returns {Promise<boolean>}
	 * @memberof Argon2
	 */
	static verify(hash: string, password: string): Promise<boolean>;
}
