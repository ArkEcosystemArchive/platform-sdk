import { BIP32Interface, fromSeed } from "bip32";

import { BIP39 } from "./bip39";

export class BIP32 {
	public static fromMnemonic(mnemonic: string): BIP32Interface {
		mnemonic = BIP39.normalize(mnemonic);

		BIP39.validate(mnemonic);

		return fromSeed(BIP39.toSeed(mnemonic));
	}
}
