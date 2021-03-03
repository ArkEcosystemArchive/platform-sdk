import { decrypt, encrypt, verify } from "bip38";

export class BIP38 {
	public static encrypt(buffer: Buffer, mnemonic: string, compressed = true): string {
		return encrypt(buffer, compressed, mnemonic);
	}

	public static decrypt(string: string, mnemonic: string): { compressed: boolean; privateKey: string } {
		const { compressed, privateKey } = decrypt(string, mnemonic);

		return { compressed, privateKey: privateKey.toString("hex") };
	}

	public static verify(string: string): boolean {
		return verify(string);
	}
}
