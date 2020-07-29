import argon2 from "argon2-browser";

export class Argon2 {
	public static async hash(value: string): Promise<string> {
		return (await argon2.hash({ pass: value, salt: Math.random().toString(10) })).encoded;
	}

	public static async verify(hash: string, password: string): Promise<boolean> {
		try {
			await argon2.verify({ pass: password, encoded: hash });

			return true;
		} catch {
			return false;
		}
	}
}
