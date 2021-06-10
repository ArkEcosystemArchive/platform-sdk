"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIP38 = void 0;
const bip38_1 = require("bip38");
/**
 * Implements all functionality that is required to encrypt and decrypt a
 * passphrase-protected private key in compliance with BIP38 specifications.
 *
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0038.mediawiki}
 *
 * @export
 * @class BIP38
 */
class BIP38 {
	/**
	 * Encrypts a private key using the given mnemonic passphrase.
	 *
	 * @static
	 * @param {Buffer} privateKey
	 * @param {string} mnemonic
	 * @param {boolean} [compressed=true]
	 * @returns {string}
	 * @memberof BIP38
	 */
	static encrypt(privateKey, mnemonic, compressed = true) {
		return bip38_1.encrypt(privateKey, compressed, mnemonic);
	}
	/**
	 * Decrypts an encrypted private key using the given mnemonic passphrase.
	 *
	 * @static
	 * @param {string} value
	 * @param {string} mnemonic
	 * @returns {{ compressed: boolean; privateKey: string }}
	 * @memberof BIP38
	 */
	static decrypt(value, mnemonic) {
		const { compressed, privateKey } = bip38_1.decrypt(value, mnemonic);
		return { compressed, privateKey: privateKey.toString("hex") };
	}
	/**
	 * Verifies if the given value has been encrypted with BIP38.
	 *
	 * @static
	 * @param {string} value
	 * @returns {boolean}
	 * @memberof BIP38
	 */
	static verify(value) {
		return bip38_1.verify(value);
	}
}
exports.BIP38 = BIP38;
//# sourceMappingURL=bip38.js.map
