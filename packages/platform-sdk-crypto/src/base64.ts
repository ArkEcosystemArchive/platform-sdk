type BufferEncoding =
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
 *
 *
 * @export
 * @class Base64
 */
export class Base64 {
	public static encode(value: string, encoding: BufferEncoding = "utf8"): string {
		return Buffer.from(value, encoding).toString("base64");
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} value
	 * @param {BufferEncoding} [encoding="utf8"]
	 * @returns {string}
	 * @memberof Base64
	 */
	public static decode(value: string, encoding: BufferEncoding = "utf8"): string {
		return Buffer.from(value, "base64").toString(encoding);
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} value
	 * @returns {boolean}
	 * @memberof Base64
	 */
	public static validate(value: string): boolean {
		try {
			return btoa(atob(value)) === value;
		} catch {
			return false;
		}
	}
}
