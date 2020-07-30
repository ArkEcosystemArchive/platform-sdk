import bcrypt from "bcryptjs";

export class Bcrypt {
	public static hash(value: string): string {
		return bcrypt.hashSync(value);
	}

	public static verify(hash: string, password: string): boolean {
		return bcrypt.compareSync(password, hash);
	}
}
