"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIP32 = void 0;
const bip32_1 = require("bip32");
const bip39_1 = require("./bip39");
/**
 * Implements all functionality that is required to work with BIP32 to create
 * hierarchical deterministic wallets in compliant with the specifications.
 *
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki}
 *
 * @export
 * @class BIP32
 */
class BIP32 {
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
	static fromMnemonic(mnemonic) {
		mnemonic = bip39_1.BIP39.normalize(mnemonic);
		bip39_1.BIP39.validate(mnemonic);
		return bip32_1.fromSeed(bip39_1.BIP39.toSeed(mnemonic));
	}
	/**
	 * Derives a BIP32 key from a seed.
	 *
	 * @static
	 * @param {string} seed
	 * @returns {BIP32Interface}
	 * @memberof BIP32
	 */
	static fromSeed(seed) {
		return bip32_1.fromSeed(Buffer.from(seed, "hex"));
	}
	/**
	 * Derives a BIP32 key from a base58 encoded private key.
	 *
	 * @static
	 * @param {string} value
	 * @returns {BIP32Interface}
	 * @memberof BIP32
	 */
	static fromBase58(value) {
		return bip32_1.fromBase58(value);
	}
	/**
	 * Derives a BIP32 key from a hex public key.
	 *
	 * @static
	 * @param {string} publicKey
	 * @param {string} chainCode
	 * @returns {BIP32Interface}
	 * @memberof BIP32
	 */
	static fromPublicKey(publicKey, chainCode) {
		return bip32_1.fromPublicKey(Buffer.from(publicKey, "hex"), Buffer.from(chainCode, "hex"));
	}
	/**
	 * Derives a BIP32 key from a hex private key.
	 *
	 * @static
	 * @param {string} privateKey
	 * @param {string} chainCode
	 * @returns {BIP32Interface}
	 * @memberof BIP32
	 */
	static fromPrivateKey(privateKey, chainCode) {
		return bip32_1.fromPrivateKey(Buffer.from(privateKey, "hex"), Buffer.from(chainCode, "hex"));
	}
}
exports.BIP32 = BIP32;
//# sourceMappingURL=bip32.js.map
