import { decrypt, encrypt } from "encrypt-with-password";

export class AES {
	public static encrypt(input: string, password: string): string {
		return encrypt(input, password);
	}

	public static decrypt(input: string, password: string): string {
		return decrypt(input, password);
	}
}
