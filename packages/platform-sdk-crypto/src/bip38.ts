import * as bip38 from "bip38";

export class BIP38 {
	public static encrypt(buffer: Buffer, passphrase: string, compressed = true): string {
		return bip38.encrypt(buffer, compressed, passphrase);
	}

	public static decrypt(string: string, passphrase: string): { compressed: boolean; privateKey: string } {
		const { compressed, privateKey } = bip38.decrypt(string, passphrase);

		return { compressed, privateKey: privateKey.toString("hex") };
	}

	public static verify(string: string): boolean {
		return bip38.verify(string);
	}
}
