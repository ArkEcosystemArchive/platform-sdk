import { mnemonicToSeedSync, validateMnemonic, wordlists } from "bip39";

export class BIP39 {
	public static validate(mnemonic: string, locale = "english"): boolean {
		return validateMnemonic(BIP39.normalize(mnemonic), wordlists[locale]);
	}

	public static toSeed(mnemonic: string): Buffer {
		return mnemonicToSeedSync(BIP39.normalize(mnemonic));
	}

	public static normalize(mnemonic: string): string {
		return mnemonic.normalize("NFD");
	}
}
