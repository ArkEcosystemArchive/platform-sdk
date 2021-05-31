import { base58 } from "bstring";

const normalise = (value: string | Buffer): Buffer => (value instanceof Buffer ? value : Buffer.from(value, "hex"));

/**
 * Implements all functionality that is required to work with the Base58
 * binary-to-text encoding scheme as defined by the specifications.
 *
 * @see {@link https://learnmeabitcoin.com/technical/base58}
 *
 * @export
 * @class Base58
 */
export class Base58 {
	/**
	 * Encodes a string in compliance with the Base58 encoding scheme.
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
	 * Decodes a string in compliance with the Base58 encoding scheme.
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
	 * Validates that the given value has been encoded in compliance with
	 * the Base58 encoding scheme to ensure that decoding it is possible.
	 *
	 * @remarks
	 * This method should be called before attemtping to decode a value
	 * to avoid any unhandled or unexpected exceptions.
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
