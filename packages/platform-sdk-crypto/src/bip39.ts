import { mnemonicToSeedSync, validateMnemonic, wordlists } from "bip39";

export class BIP39 {
	public static validate(passphrase: string, locale = "english"): boolean {
		return validateMnemonic(BIP39.normalize(passphrase), wordlists[locale]);
	}

	public static toSeed(passphrase: string): Buffer {
		return mnemonicToSeedSync(BIP39.normalize(passphrase));
	}

	public static normalize(passphrase: string): string {
		return passphrase.normalize("NFD");
	}
}
