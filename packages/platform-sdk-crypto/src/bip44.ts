import * as bip32 from "bip32";

import { BIP39 } from "./bip39";

export class BIP44 {
	public static deriveChild(
		mnemonic: string,
		options: { coinType: number; account?: number; change?: number; index?: number },
	): bip32.BIP32Interface {
		if (options.account === undefined) {
			options.account = 0;
		}

		if (options.change === undefined) {
			options.change = 0;
		}

		if (options.index === undefined) {
			options.index = 0;
		}

		return BIP44.deriveMasterKey(BIP39.normalize(mnemonic))
			.deriveHardened(44)
			.deriveHardened(options.coinType)
			.deriveHardened(options.account)
			.derive(options.change)
			.derive(options.index);
	}

	public static deriveChildFromPath(mnemonic: string, path: string, index = 0): bip32.BIP32Interface {
		return BIP44.deriveMasterKey(mnemonic).derivePath(`${path}${index}`);
	}

	public static deriveMasterKey(mnemonic: string): bip32.BIP32Interface {
		BIP39.validate(mnemonic);

		return bip32.fromSeed(BIP39.toSeed(mnemonic));
	}

	public static parse(
		path: string,
	): {
		purpose: number;
		coinType: number;
		account: number;
		change: number;
		addressIndex: number;
	} {
		if (!path.match(new RegExp("^((m/)?(44'?)){1}(/[0-9]+'?){2}(/[0-9]+){2}$", "g"))) {
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
