import bcrypt from "bcryptjs";

/**
 *
 *
 * @export
 * @class Bcrypt
 */
export class Bcrypt {
	/**
	 *
	 *
	 * @static
	 * @param {string} value
	 * @returns {string}
	 * @memberof Bcrypt
	 */
	public static hash(value: string): string {
		return bcrypt.hashSync(value);
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} hash
	 * @param {string} password
	 * @returns {boolean}
	 * @memberof Bcrypt
	 */
	public static verify(hash: string, password: string): boolean {
		return bcrypt.compareSync(password, hash);
	}
}
