import BaseCode, { QRCodeToDataURLOptions } from "qrcode";

type StringType = "utf8" | "svg" | "terminal" | undefined;

/**
 * A helper to generate QRCodes.
 *
 * @export
 * @class QRCode
 */
export class QRCode {
	/**
	 * The value that should be represented through the QRCode.
	 *
	 * @type {string}
	 * @memberof QRCode
	 */
	readonly #value: string;

	/**
	 * Creates an instance of QRCode.
	 *
	 * @param {string} value
	 * @memberof QRCode
	 */
	private constructor(value: string) {
		this.#value = value;
	}

	/**
	 * Creates an instance of QRCode from a string.
	 *
	 * @static
	 * @param {string} value
	 * @returns {QRCode}
	 * @memberof QRCode
	 */
	public static fromString(value: string): QRCode {
		return new QRCode(value);
	}

	/**
	 * Creates an instance of QRCode from an object.
	 *
	 * @static
	 * @param {object} value
	 * @returns {QRCode}
	 * @memberof QRCode
	 */
	public static fromObject(value: object): QRCode {
		return new QRCode(JSON.stringify(value));
	}

	/**
	 * Returns a data URI that can be used to display the QRCode as an image.
	 *
	 * @param {QRCodeToDataURLOptions} [options={}]
	 * @returns {Promise<string>}
	 * @memberof QRCode
	 */
	public async toDataURL(options: QRCodeToDataURLOptions = {}): Promise<string> {
		return BaseCode.toDataURL(this.#value, options);
	}

	/**
	 * Returns a string representation of the QRCode. This will usually be an SVG for real-world usage.
	 *
	 * @param {StringType} [type="utf8"]
	 * @returns {Promise<string>}
	 * @memberof QRCode
	 */
	public async toString(type: StringType = "utf8"): Promise<string> {
		return BaseCode.toString(this.#value, { type });
	}
}
