import { base58 } from "bstring";

const normalise = (value: string | Buffer) => (value instanceof Buffer ? value : Buffer.from(value, "hex"));

/**
 *
 * @see {@link https://learnmeabitcoin.com/technical/base58}
 *
 * @export
 * @class Base58
 */
export class Base58 {
	/**
	 *
	 *
	 * @static
	 * @param {(string | Buffer)} value
	 * @returns {string}
	 * @memberof Base58
	 */
	public static encode(value: string | Buffer): string {
		return base58.encode(normalise(value));
	}

	/**
	 *
	 *
	 * @static
	 * @param {(string | Buffer)} value
	 * @returns {Buffer}
	 * @memberof Base58
	 */
	public static decode(value: string | Buffer): Buffer {
		return base58.decode(normalise(value));
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} value
	 * @returns {boolean}
	 * @memberof Base58
	 */
	public static validate(value: string): boolean {
		try {
			base58.decode(value);

			return true;
		} catch {
			return false;
		}
	}
}
