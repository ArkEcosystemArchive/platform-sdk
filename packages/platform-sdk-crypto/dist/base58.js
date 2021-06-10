"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base58 = void 0;
const bstring_1 = require("bstring");
const normalise = (value) => (value instanceof Buffer ? value : Buffer.from(value));
/**
 * Implements all functionality that is required to work with the Base58
 * binary-to-text encoding scheme as defined by the specifications.
 *
 * @see {@link https://learnmeabitcoin.com/technical/base58}
 *
 * @export
 * @class Base58
 */
class Base58 {
	/**
	 * Encodes a string in compliance with the Base58 encoding scheme.
	 *
	 * @static
	 * @param {(string | Buffer)} value
	 * @returns {string}
	 * @memberof Base58
	 */
	static encode(value) {
		return bstring_1.base58.encode(normalise(value));
	}
	/**
	 * Decodes a string in compliance with the Base58 encoding scheme.
	 *
	 * @static
	 * @param {string} value
	 * @returns {Buffer}
	 * @memberof Base58
	 */
	static decode(value) {
		return bstring_1.base58.decode(value).toString();
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
	static validate(value) {
		return bstring_1.base58.test(value);
	}
}
exports.Base58 = Base58;
//# sourceMappingURL=base58.js.map
