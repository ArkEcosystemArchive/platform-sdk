"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buffoon = void 0;
/**
 *
 *
 * @export
 * @class Buffoon
 */
class Buffoon {
	/**
	 *
	 *
	 * @static
	 * @param {(Buffer | string)} value
	 * @returns {Buffer}
	 * @memberof Buffoon
	 */
	static make(value) {
		return value instanceof Buffer ? value : Buffer.from(value);
	}
	/**
	 *
	 *
	 * @static
	 * @param {*} value
	 * @returns {Buffer}
	 * @memberof Buffoon
	 */
	static fromUTF8(value) {
		return Buffer.from(value, "utf8");
	}
	/**
	 *
	 *
	 * @static
	 * @param {*} value
	 * @returns {Buffer}
	 * @memberof Buffoon
	 */
	static fromHex(value) {
		return Buffer.from(value, "hex");
	}
	/**
	 *
	 *
	 * @static
	 * @param {*} value
	 * @returns {string}
	 * @memberof Buffoon
	 */
	static toHex(value) {
		return Buffer.from(value).toString("hex");
	}
	/**
	 *
	 *
	 * @static
	 * @param {*} value
	 * @returns {string}
	 * @memberof Buffoon
	 */
	static toBase64(value) {
		return Buffer.from(value, "binary").toString("base64");
	}
}
exports.Buffoon = Buffoon;
//# sourceMappingURL=buffoon.js.map
