export class Buffoon {
	public static make(value: Buffer | string): Buffer {
		return value instanceof Buffer ? value : Buffer.from(value);
	}

	public static fromUTF8(value: any): Buffer {
		return Buffer.from(value, "utf8");
	}

	public static fromHex(value: any): Buffer {
		return Buffer.from(value, "hex");
	}

	public static toHex(value: any): string {
		return Buffer.from(value).toString("hex");
	}

	public static toBase64(value: any): string {
		return Buffer.from(value, "binary").toString("base64");
	}
}
