import { decrypt, encrypt, verify } from "bip38";

/**
 *
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0038.mediawiki}
 *
 * @export
 * @class BIP38
 */
export class BIP38 {
	/**
	 *
	 *
	 * @static
	 * @param {Buffer} buffer
	 * @param {string} mnemonic
	 * @param {boolean} [compressed=true]
	 * @returns {string}
	 * @memberof BIP38
	 */
	public static encrypt(buffer: Buffer, mnemonic: string, compressed = true): string {
		return encrypt(buffer, compressed, mnemonic);
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} string
	 * @param {string} mnemonic
	 * @returns {{ compressed: boolean; privateKey: string }}
	 * @memberof BIP38
	 */
	public static decrypt(string: string, mnemonic: string): { compressed: boolean; privateKey: string } {
		const { compressed, privateKey } = decrypt(string, mnemonic);

		return { compressed, privateKey: privateKey.toString("hex") };
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} string
	 * @returns {boolean}
	 * @memberof BIP38
	 */
	public static verify(string: string): boolean {
		return verify(string);
	}
}
