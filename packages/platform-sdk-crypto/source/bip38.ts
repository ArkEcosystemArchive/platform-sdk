import { decrypt, encrypt, verify } from "bip38";

/**
 * Implements all functionality that is required to encrypt and decrypt a
 * passphrase-protected private key in compliance with BIP38 specifications.
 *
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0038.mediawiki}
 *
 * @export
 * @class BIP38
 */
export class BIP38 {
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
	public static encrypt(privateKey: Buffer, mnemonic: string, compressed = true): string {
		return encrypt(privateKey, compressed, mnemonic);
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
	public static decrypt(value: string, mnemonic: string): { compressed: boolean; privateKey: string } {
		const { compressed, privateKey } = decrypt(value, mnemonic);

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
	public static verify(value: string): boolean {
		return verify(value);
	}
}
