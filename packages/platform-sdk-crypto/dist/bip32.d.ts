import { BIP32Interface } from "bip32";
/**
 * Implements all functionality that is required to work with BIP32 to create
 * hierarchical deterministic wallets in compliant with the specifications.
 *
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki}
 *
 * @export
 * @class BIP32
 */
export declare class BIP32 {
	/**
	 * Derives a BIP32 key from a mnemonic passphrase.
	 *
	 * @remarks
	 * Before deriving the BIP32 key the mnemonic passphrase will be
	 * normalised and validated to ensure that no loss of funds is
	 * possible due to importing false data which might confuse a users.
	 *
	 * @static
	 * @param {string} mnemonic
	 * @returns {BIP32Interface}
	 * @memberof BIP32
	 */
	static fromMnemonic(mnemonic: string): BIP32Interface;
	/**
	 * Derives a BIP32 key from a seed.
	 *
	 * @static
	 * @param {string} seed
	 * @returns {BIP32Interface}
	 * @memberof BIP32
	 */
	static fromSeed(seed: string): BIP32Interface;
	/**
	 * Derives a BIP32 key from a base58 encoded private key.
	 *
	 * @static
	 * @param {string} value
	 * @returns {BIP32Interface}
	 * @memberof BIP32
	 */
	static fromBase58(value: string): BIP32Interface;
	/**
	 * Derives a BIP32 key from a hex public key.
	 *
	 * @static
	 * @param {string} publicKey
	 * @param {string} chainCode
	 * @returns {BIP32Interface}
	 * @memberof BIP32
	 */
	static fromPublicKey(publicKey: string, chainCode: string): BIP32Interface;
	/**
	 * Derives a BIP32 key from a hex private key.
	 *
	 * @static
	 * @param {string} privateKey
	 * @param {string} chainCode
	 * @returns {BIP32Interface}
	 * @memberof BIP32
	 */
	static fromPrivateKey(privateKey: string, chainCode: string): BIP32Interface;
}
