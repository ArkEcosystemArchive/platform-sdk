export class BIP39 {
	public static normalize(passphrase: string): string {
		return passphrase.normalize("NFD");
	}
}
