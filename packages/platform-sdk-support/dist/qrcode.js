"use strict";
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _QRCode_value;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRCode = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
/**
 * A helper to generate QRCodes.
 *
 * @export
 * @class QRCode
 */
class QRCode {
	/**
	 * Creates an instance of QRCode.
	 *
	 * @param {string} value
	 * @memberof QRCode
	 */
	constructor(value) {
		/**
		 * The value that should be represented through the QRCode.
		 *
		 * @type {string}
		 * @memberof QRCode
		 */
		_QRCode_value.set(this, void 0);
		__classPrivateFieldSet(this, _QRCode_value, value, "f");
	}
	/**
	 * Creates an instance of QRCode from a string.
	 *
	 * @static
	 * @param {string} value
	 * @returns {QRCode}
	 * @memberof QRCode
	 */
	static fromString(value) {
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
	static fromObject(value) {
		return new QRCode(JSON.stringify(value));
	}
	/**
	 * Returns a data URI that can be used to display the QRCode as an image.
	 *
	 * @param {QRCodeToDataURLOptions} [options={}]
	 * @returns {Promise<string>}
	 * @memberof QRCode
	 */
	async toDataURL(options = {}) {
		return qrcode_1.default.toDataURL(__classPrivateFieldGet(this, _QRCode_value, "f"), options);
	}
	/**
	 * Returns a string representation of the QRCode. This will usually be an SVG for real-world usage.
	 *
	 * @param {StringType} [type="utf8"]
	 * @returns {Promise<string>}
	 * @memberof QRCode
	 */
	async toString(type = "utf8") {
		return qrcode_1.default.toString(__classPrivateFieldGet(this, _QRCode_value, "f"), { type });
	}
}
exports.QRCode = QRCode;
_QRCode_value = new WeakMap();
//# sourceMappingURL=qrcode.js.map
