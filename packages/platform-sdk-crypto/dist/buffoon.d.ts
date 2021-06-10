/// <reference types="node" />
/**
 *
 *
 * @export
 * @class Buffoon
 */
export declare class Buffoon {
	/**
	 *
	 *
	 * @static
	 * @param {(Buffer | string)} value
	 * @returns {Buffer}
	 * @memberof Buffoon
	 */
	static make(value: Buffer | string): Buffer;
	/**
	 *
	 *
	 * @static
	 * @param {*} value
	 * @returns {Buffer}
	 * @memberof Buffoon
	 */
	static fromUTF8(value: any): Buffer;
	/**
	 *
	 *
	 * @static
	 * @param {*} value
	 * @returns {Buffer}
	 * @memberof Buffoon
	 */
	static fromHex(value: any): Buffer;
	/**
	 *
	 *
	 * @static
	 * @param {*} value
	 * @returns {string}
	 * @memberof Buffoon
	 */
	static toHex(value: any): string;
	/**
	 *
	 *
	 * @static
	 * @param {*} value
	 * @returns {string}
	 * @memberof Buffoon
	 */
	static toBase64(value: any): string;
}
