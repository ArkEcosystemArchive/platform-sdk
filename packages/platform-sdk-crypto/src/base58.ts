import { base58 } from "bstring";

const normalise = (value: string | Buffer) => (value instanceof Buffer ? value : Buffer.from(value, "hex"));

export class Base58 {
	public static encode(value: string | Buffer): string {
		return base58.encode(normalise(value));
	}

	public static decode(value: string | Buffer): Buffer {
		return base58.decode(normalise(value));
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
