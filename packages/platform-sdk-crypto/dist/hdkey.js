"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HDKey = void 0;
const create_xpub_1 = __importDefault(require("create-xpub"));
const hdkey_1 = require("hdkey");
const normalise = (value) => (value instanceof Buffer ? value : Buffer.from(value, "hex"));
/**
 *
 *
 * @export
 * @class HDKey
 */
class HDKey {
	/**
	 *
	 *
	 * @static
	 * @param {(string | Buffer)} seed
	 * @returns {Base}
	 * @memberof HDKey
	 */
	static fromSeed(seed) {
		return hdkey_1.fromMasterSeed(normalise(seed));
	}
	/**
	 *
	 *
	 * @static
	 * @param {string} publicKey
	 * @returns {Base}
	 * @memberof HDKey
	 */
	static fromExtendedPublicKey(publicKey) {
		if (!publicKey.startsWith("xpub")) {
			throw new Error("The given key is not an extended public key.");
		}
		return hdkey_1.fromExtendedKey(publicKey);
	}
	/**
	 *
	 *
	 * @static
	 * @param {string} privateKey
	 * @returns {Base}
	 * @memberof HDKey
	 */
	static fromExtendedPrivateKey(privateKey) {
		if (!privateKey.startsWith("xprv")) {
			throw new Error("The given key is not an extended private key.");
		}
		return hdkey_1.fromExtendedKey(privateKey);
	}
	/**
	 *
	 *
	 * @static
	 * @param {string} publicKey
	 * @param {{ depth: number; childNumber: number }} [options={ depth: 0, childNumber: 2147483648 }]
	 * @returns {Base}
	 * @memberof HDKey
	 */
	static fromCompressedPublicKey(publicKey, options = { depth: 0, childNumber: 2147483648 }) {
		return HDKey.fromExtendedPublicKey(
			create_xpub_1.default({
				depth: options.depth,
				childNumber: options.childNumber,
				chainCode: publicKey.slice(-64),
				publicKey: publicKey.slice(0, 66),
			}),
		);
	}
}
exports.HDKey = HDKey;
//# sourceMappingURL=hdkey.js.map
