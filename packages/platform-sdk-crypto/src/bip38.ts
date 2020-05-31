import * as bip38 from "bip38";

export class BIP38 {
	public static encrypt(buffer: Buffer, passphrase: string, compressed = true): string {
		return bip38.encrypt(buffer, compressed, passphrase);
	}

	public static decrypt(string: string, passphrase: string) {
		return bip38.decrypt(string, passphrase);
	}

	public static verify(string: string): boolean {
		return bip38.verify(string);
	}
}
