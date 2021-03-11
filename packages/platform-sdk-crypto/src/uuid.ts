import { parse, stringify, v1, v3, v4, v5, validate } from "uuid";

export class UUID {
	public static timestamp(): string {
		return v1();
	}

	public static md5(name: string, namespace: string): string {
		return v3(name, namespace);
	}

	public static random(): string {
		return v4();
	}

	public static sha1(name: string, namespace: string): string {
		return v5(name, namespace);
	}

	public static parse(uuid: string): Buffer {
		return parse(uuid);
	}

	public static stringify(uuid: Buffer): string {
		return stringify(uuid);
	}

	public static validate(uuid: string): boolean {
		return validate(uuid);
	}
}
