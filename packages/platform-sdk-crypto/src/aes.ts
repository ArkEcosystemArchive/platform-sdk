import ncrypt from "ncrypt-js";

export class AES {
	public static encrypt(input: string, key: string): string {
		return new ncrypt(key).encrypt(input);
	}

	public static decrypt(input: string, key: string): string {
		return new ncrypt(key).decrypt(input);
	}
}
