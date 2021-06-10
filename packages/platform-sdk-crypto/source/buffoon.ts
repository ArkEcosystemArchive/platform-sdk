/**
 *
 *
 * @export
 * @class Buffoon
 */
export class Buffoon {
	/**
	 *
	 *
	 * @static
	 * @param {(Buffer | string)} value
	 * @returns {Buffer}
	 * @memberof Buffoon
	 */
	public static make(value: Buffer | string): Buffer {
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
	public static fromUTF8(value: any): Buffer {
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
	public static fromHex(value: any): Buffer {
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
	public static toHex(value: any): string {
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
	public static toBase64(value: any): string {
		return Buffer.from(value, "binary").toString("base64");
	}
}
