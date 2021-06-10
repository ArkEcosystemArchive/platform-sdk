"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIP44 = void 0;
const bip32_1 = require("./bip32");
/**
 * Implements all functionality that is required to create and parse BIP44
 * compliant paths and hierarchical deterministic wallets that are derived
 * from those.
 *
 * @remarks
 * BIP32 is the foundation of BIP44 and implemented in a separate class
 * because it is required on its own for various coin implementations.
 *
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki}
 * @see {@link https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki}
 *
 * @export
 * @class BIP44
 */
class BIP44 {
	/**
	 * Derives a child from a BIP32 HDWallet hardened account, according to BIP44.
	 *
	 * @static
	 * @param {string} mnemonic
	 * @param {{ purpose?: number; coinType: number; account?: number; change?: number; index?: number }} options
	 * @returns {BIP32Interface}
	 * @memberof BIP44
	 */
	static deriveChild(mnemonic, options) {
		return bip32_1.BIP32.fromMnemonic(mnemonic)
			.deriveHardened(options.purpose || 44)
			.deriveHardened(options.coinType)
			.deriveHardened(options.account || 0)
			.derive(options.change || 0)
			.derive(options.index || 0);
	}
	/**
	 * Derives a child and its path.
	 *
	 * @static
	 * @param {string} mnemonic
	 * @param {{ purpose?: number; coinType: number; account?: number; change?: number; index?: number }} options
	 * @returns {BIP32Interface}
	 * @memberof BIP44
	 */
	static deriveChildWithPath(mnemonic, options) {
		return {
			child: BIP44.deriveChild(mnemonic, options),
			path: BIP44.stringify(options),
		};
	}
	/**
	 * Derives a child from a BIP32 HDWallet, using a BIP44 compliant path.
	 *
	 * @static
	 * @param {string} mnemonic
	 * @param {string} path
	 * @param {number} [index]
	 * @returns {BIP32Interface}
	 * @memberof BIP44
	 */
	static deriveChildFromPath(mnemonic, path, index) {
		return bip32_1.BIP32.fromMnemonic(mnemonic).derivePath(`${path}${index || 0}`);
	}
	/**
	 * Parses a BIP44 compliant path and breaks it down into its levels.
	 *
	 * @static
	 * @param {string} path
	 * @returns {BIP44Levels}
	 * @memberof BIP44
	 */
	static parse(path) {
		if (!path.match(new RegExp("^((m/)?(44'?))(/[0-9]+'?){2}((/[0-9]+){2})?$", "g"))) {
			throw new Error(path);
		}
		const result = [];
		for (const level of path.replace("m/", "").split("/")) {
			result.push(+level.replace("'", ""));
		}
		return {
			purpose: result[0],
			coinType: result[1],
			account: result[2],
			change: result[3],
			addressIndex: result[4],
		};
	}
	/**
	 * Creates a BIP32 path from a given set of values. Assumes BIP44 by default.
	 *
	 * @static
	 * @param {{ purpose?: number; coinType: number; account?: number; change?: number; index?: number }} options
	 * @returns {BIP32Interface}
	 * @memberof BIP44
	 */
	static stringify(options) {
		return `m/${options.purpose || 44}'/${options.coinType}'/${options.account || 0}'/${options.change || 0}/${
			options.index || 0
		}`;
	}
}
exports.BIP44 = BIP44;
//# sourceMappingURL=bip44.js.map
