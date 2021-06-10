"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64 = void 0;
/**
 * Implements all functionality that is required to work with the Base64
 * binary-to-text encoding scheme as defined by the specifications.
 *
 * @see {@link https://en.wikipedia.org/wiki/Base64}
 *
 * @export
 * @class Base64
 */
class Base64 {
	/**
	 * Encodes a string in compliance with the Base64 encoding scheme.
	 *
	 * @static
	 * @param {string} value
	 * @param {BufferEncoding} [encoding="utf8"]
	 * @returns {string}
	 * @memberof Base64
	 */
	static encode(value, encoding = "utf8") {
		return Buffer.from(value, encoding).toString("base64");
	}
	/**
	 * Decodes a string in compliance with the Base64 encoding scheme.
	 *
	 * @static
	 * @param {string} value
	 * @param {BufferEncoding} [encoding="utf8"]
	 * @returns {string}
	 * @memberof Base64
	 */
	static decode(value, encoding = "utf8") {
		return Buffer.from(value, "base64").toString(encoding);
	}
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
	static validate(value) {
		return Buffer.from(value, "base64").toString("base64") === value;
	}
}
exports.Base64 = Base64;
//# sourceMappingURL=base64.js.map
