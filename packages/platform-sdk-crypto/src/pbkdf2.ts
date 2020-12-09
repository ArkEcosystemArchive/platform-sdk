import StringCrypto from "string-crypto";

export class PBKDF2 {
	public static encrypt(value: string, password: string): string {
		return new StringCrypto().encryptString(value, password);
	}

	public static decrypt(value: string, password: string): string {
		return new StringCrypto().decryptString(value, password);
	}
}
