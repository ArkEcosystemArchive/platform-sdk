import { BIP32Interface, fromBase58, fromPrivateKey, fromPublicKey, fromSeed } from "bip32";

import { BIP39 } from "./bip39";

/**
 *
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki}
 *
 * @export
 * @class BIP32
 */
export class BIP32 {
	/**
	 *
	 *
	 * @static
	 * @param {string} mnemonic
	 * @returns {BIP32Interface}
	 * @memberof BIP32
	 */
	public static fromMnemonic(mnemonic: string): BIP32Interface {
		mnemonic = BIP39.normalize(mnemonic);

		BIP39.validate(mnemonic);

		return fromSeed(BIP39.toSeed(mnemonic));
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} seed
	 * @returns {BIP32Interface}
	 * @memberof BIP32
	 */
	public static fromSeed(seed: string): BIP32Interface {
		return fromSeed(Buffer.from(seed, "hex"));
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} value
	 * @returns {BIP32Interface}
	 * @memberof BIP32
	 */
	public static fromBase58(value: string): BIP32Interface {
		return fromBase58(value);
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} publicKey
	 * @param {string} chainCode
	 * @returns {BIP32Interface}
	 * @memberof BIP32
	 */
	public static fromPublicKey(publicKey: string, chainCode: string): BIP32Interface {
		return fromPublicKey(Buffer.from(publicKey, "hex"), Buffer.from(chainCode, "hex"));
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} privateKey
	 * @param {string} chainCode
	 * @returns {BIP32Interface}
	 * @memberof BIP32
	 */
	public static fromPrivateKey(privateKey: string, chainCode: string): BIP32Interface {
		return fromPrivateKey(Buffer.from(privateKey, "hex"), Buffer.from(chainCode, "hex"));
	}
}
