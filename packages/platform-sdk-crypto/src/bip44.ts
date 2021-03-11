import { BIP32Interface } from "bip32";

import { BIP32 } from "./bip32";

/**
 *
 *
 * @export
 * @class BIP44
 */
export class BIP44 {
	/**
	 *
	 *
	 * @static
	 * @param {string} mnemonic
	 * @param {{ purpose?: number; coinType: number; account?: number; change?: number; index?: number }} options
	 * @returns {BIP32Interface}
	 * @memberof BIP44
	 */
	public static deriveChild(
		mnemonic: string,
		options: { purpose?: number; coinType: number; account?: number; change?: number; index?: number },
	): BIP32Interface {
		return BIP32.fromMnemonic(mnemonic)
			.deriveHardened(options.purpose || 44)
			.deriveHardened(options.coinType)
			.deriveHardened(options.account || 0)
			.derive(options.change || 0)
			.derive(options.index || 0);
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} mnemonic
	 * @param {string} path
	 * @param {number} [index]
	 * @returns {BIP32Interface}
	 * @memberof BIP44
	 */
	public static deriveChildFromPath(mnemonic: string, path: string, index?: number): BIP32Interface {
		return BIP32.fromMnemonic(mnemonic).derivePath(`${path}${index || 0}`);
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} mnemonic
	 * @returns {BIP32Interface}
	 * @memberof BIP44
	 */
	public static deriveMasterKey(mnemonic: string): BIP32Interface {
		return BIP32.fromMnemonic(mnemonic);
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} path
	 * @returns {{
	 * 		purpose: number;
	 * 		coinType: number;
	 * 		account: number;
	 * 		change: number;
	 * 		addressIndex: number;
	 * 	}}
	 * @memberof BIP44
	 */
	public static parse(
		path: string,
	): {
		purpose: number;
		coinType: number;
		account: number;
		change: number;
		addressIndex: number;
	} {
		if (!path.match(new RegExp("^((m/)?(44'?))(/[0-9]+'?){2}((/[0-9]+){2})?$", "g"))) {
			throw new Error(path);
		}

		const result: number[] = [];
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
}
