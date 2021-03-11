import { generateMnemonic, mnemonicToEntropy, mnemonicToSeedSync, validateMnemonic, wordlists } from "bip39";

/**
 *
 *
 * @export
 * @class BIP39
 */
export class BIP39 {
	/**
	 *
	 *
	 * @static
	 * @param {string} [locale="english"]
	 * @returns {string}
	 * @memberof BIP39
	 */
	public static generate(locale = "english"): string {
		return generateMnemonic(undefined, undefined, wordlists[locale]);
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} mnemonic
	 * @param {string} [locale="english"]
	 * @returns {boolean}
	 * @memberof BIP39
	 */
	public static validate(mnemonic: string, locale = "english"): boolean {
		return validateMnemonic(BIP39.normalize(mnemonic), wordlists[locale]);
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} mnemonic
	 * @returns {Buffer}
	 * @memberof BIP39
	 */
	public static toSeed(mnemonic: string): Buffer {
		return mnemonicToSeedSync(BIP39.normalize(mnemonic));
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} mnemonic
	 * @returns {string}
	 * @memberof BIP39
	 */
	public static toEntropy(mnemonic: string): string {
		return mnemonicToEntropy(BIP39.normalize(mnemonic));
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} mnemonic
	 * @returns {string}
	 * @memberof BIP39
	 */
	public static normalize(mnemonic: string): string {
		return mnemonic.normalize("NFD");
	}
}
