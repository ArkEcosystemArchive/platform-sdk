/// <reference types="node" />
/**
 * Implements all functionality that is required to work with the Base58
 * binary-to-text encoding scheme as defined by the specifications.
 *
 * @see {@link https://learnmeabitcoin.com/technical/base58}
 *
 * @export
 * @class Base58
 */
export declare class Base58 {
	/**
	 * Encodes a string in compliance with the Base58 encoding scheme.
	 *
	 * @static
	 * @param {(string | Buffer)} value
	 * @returns {string}
	 * @memberof Base58
	 */
	static encode(value: string | Buffer): string;
	/**
	 * Decodes a string in compliance with the Base58 encoding scheme.
	 *
	 * @static
	 * @param {string} value
	 * @returns {Buffer}
	 * @memberof Base58
	 */
	static decode(value: string): Buffer;
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
	static validate(value: string): boolean;
}
