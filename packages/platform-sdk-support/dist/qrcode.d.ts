import { QRCodeToDataURLOptions } from "qrcode";
declare type StringType = "utf8" | "svg" | "terminal" | undefined;
/**
 * A helper to generate QRCodes.
 *
 * @export
 * @class QRCode
 */
export declare class QRCode {
	#private;
	/**
	 * Creates an instance of QRCode.
	 *
	 * @param {string} value
	 * @memberof QRCode
	 */
	private constructor();
	/**
	 * Creates an instance of QRCode from a string.
	 *
	 * @static
	 * @param {string} value
	 * @returns {QRCode}
	 * @memberof QRCode
	 */
	static fromString(value: string): QRCode;
	/**
	 * Creates an instance of QRCode from an object.
	 *
	 * @static
	 * @param {object} value
	 * @returns {QRCode}
	 * @memberof QRCode
	 */
	static fromObject(value: object): QRCode;
	/**
	 * Returns a data URI that can be used to display the QRCode as an image.
	 *
	 * @param {QRCodeToDataURLOptions} [options={}]
	 * @returns {Promise<string>}
	 * @memberof QRCode
	 */
	toDataURL(options?: QRCodeToDataURLOptions): Promise<string>;
	/**
	 * Returns a string representation of the QRCode. This will usually be an SVG for real-world usage.
	 *
	 * @param {StringType} [type="utf8"]
	 * @returns {Promise<string>}
	 * @memberof QRCode
	 */
	toString(type?: StringType): Promise<string>;
}
export {};
