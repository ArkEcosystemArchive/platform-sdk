export class Base64 {
	public static encode(value: string): string {
		return Buffer.from(value, "utf8").toString("base64");
	}

	public static decode(value: string): string {
		return Buffer.from(value, "base64").toString("utf8");
	}
}
