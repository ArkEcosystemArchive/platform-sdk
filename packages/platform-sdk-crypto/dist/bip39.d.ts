/// <reference types="node" />
/**
 * Implements all functionality that is required to create and validate BIP39
 * mnemonic passphrases which are used to generate deterministic private keys
 * which in turn are used to derive public keys and addresses for end-users.
 *
 * @remarks
 * BIP39 mnemonic passphrases should always be generated with 24 words if
 * they are supported. 12 words are already very secure but technology is
 * moving fast and mnemonic passphrases are rarely written out by hand.
 *
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki}
 *
 * @export
 * @class BIP39
 */
export declare class BIP39 {
	/**
	 * Generates a BIP39 compliant mnemonic passphrases.
	 *
	 * @static
	 * @param {string} [locale="english"]
	 * @returns {string}
	 * @memberof BIP39
	 */
	static generate(locale?: string): string;
	/**
	 * Validates that the input is a valid mnemonic passphrase.
	 *
	 * @remarks
	 * Valid in this context means that it only contains words from the BIP39
	 * wordlists for the various languages that it supports.
	 *
	 * @static
	 * @param {string} mnemonic
	 * @param {string} [locale="english"]
	 * @returns {boolean}
	 * @memberof BIP39
	 */
	static validate(mnemonic: string, locale?: string): boolean;
	/**
	 * Turns the given mnemonic passphrase into a seed which can then be
	 * used for the derivation of a private key to derive a public key and
	 * an address from it which will be used to send and receive funds.
	 *
	 * @static
	 * @param {string} mnemonic
	 * @returns {Buffer}
	 * @memberof BIP39
	 */
	static toSeed(mnemonic: string): Buffer;
	/**
	 * Turns the given mnemonic passphrase into entropy which can then be
	 * used for the derivation of a private key to derive a public key and
	 * an address from it which will be used to send and receive funds.
	 *
	 * @static
	 * @param {string} mnemonic
	 * @returns {string}
	 * @memberof BIP39
	 */
	static toEntropy(mnemonic: string): string;
	/**
	 * Normalises the mnemonic passphrase by ensuring a consistent encoding
	 * to avoid the loss of funds which could be caused by different encodings
	 * when going from asian to latin or cyrillic alphabets and character sets.
	 *
	 * @static
	 * @param {string} mnemonic
	 * @returns {string}
	 * @memberof BIP39
	 */
	static normalize(mnemonic: string): string;
}
