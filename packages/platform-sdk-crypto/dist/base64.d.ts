declare type BufferEncoding =
	| "utf8"
	| "ascii"
	| "utf-8"
	| "utf16le"
	| "ucs2"
	| "ucs-2"
	| "base64"
	| "latin1"
	| "binary"
	| "hex"
	| undefined;
/**
 * Implements all functionality that is required to work with the Base64
 * binary-to-text encoding scheme as defined by the specifications.
 *
 * @see {@link https://en.wikipedia.org/wiki/Base64}
 *
 * @export
 * @class Base64
 */
export declare class Base64 {
	/**
	 * Encodes a string in compliance with the Base64 encoding scheme.
	 *
	 * @static
	 * @param {string} value
	 * @param {BufferEncoding} [encoding="utf8"]
	 * @returns {string}
	 * @memberof Base64
	 */
	static encode(value: string, encoding?: BufferEncoding): string;
	/**
	 * Decodes a string in compliance with the Base64 encoding scheme.
	 *
	 * @static
	 * @param {string} value
	 * @param {BufferEncoding} [encoding="utf8"]
	 * @returns {string}
	 * @memberof Base64
	 */
	static decode(value: string, encoding?: BufferEncoding): string;
	/**
	 * Validates that the given value has been encoded in compliance with
	 * the Base64 encoding scheme to ensure that decoding it is possible.
	 *
	 * @remarks
	 * This method should be called before attemtping to decode a value
	 * to avoid any unhandled or unexpected exceptions.
	 *
	 * @static
	 * @param {string} value
	 * @returns {boolean}
	 * @memberof Base64
	 */
	static validate(value: string): boolean;
}
export {};
