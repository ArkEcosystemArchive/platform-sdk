import argon2 from "argon2";

export class Argon2 {
	public static async hash(value: string): Promise<string> {
		return argon2.hash(value);
	}

	public static async verify(hash: string, password: string): Promise<boolean> {
		return argon2.verify(hash, password);
	}
}
