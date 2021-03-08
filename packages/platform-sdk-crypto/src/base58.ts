import { base58 } from "bstring";

export class Base58 {
	public static encode(value: string | Buffer): string {
		return base58.encode(value instanceof Buffer ? value : Buffer.from(value, "hex"));
	}

	public static decode(value: string | Buffer): Buffer {
		return base58.decode(value instanceof Buffer ? value : Buffer.from(value, "hex"));
	}

	public async validate(value: string): Promise<boolean> {
		try {
			base58.decode(value);

			return true;
		} catch {
			return false;
		}
	}
}
