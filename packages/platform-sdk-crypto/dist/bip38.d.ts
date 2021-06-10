/// <reference types="node" />
/**
 * Implements all functionality that is required to encrypt and decrypt a
 * passphrase-protected private key in compliance with BIP38 specifications.
 *
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0038.mediawiki}
 *
 * @export
 * @class BIP38
 */
export declare class BIP38 {
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
	static encrypt(privateKey: Buffer, mnemonic: string, compressed?: boolean): string;
	/**
	 * Decrypts an encrypted private key using the given mnemonic passphrase.
	 *
	 * @static
	 * @param {string} value
	 * @param {string} mnemonic
	 * @returns {{ compressed: boolean; privateKey: string }}
	 * @memberof BIP38
	 */
	static decrypt(
		value: string,
		mnemonic: string,
	): {
		compressed: boolean;
		privateKey: string;
	};
	/**
	 * Verifies if the given value has been encrypted with BIP38.
	 *
	 * @static
	 * @param {string} value
	 * @returns {boolean}
	 * @memberof BIP38
	 */
	static verify(value: string): boolean;
}
