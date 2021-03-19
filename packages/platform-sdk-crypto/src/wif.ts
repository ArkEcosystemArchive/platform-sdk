import { decode, encode } from "wif";

export interface Structure {
	readonly version: number;
	readonly privateKey: string;
	readonly compressed: boolean;
}

export class WIF {
	public static encode({ version, privateKey, compressed }: Structure): string {
		return encode(version, Buffer.from(privateKey, "hex"), compressed);
	}

	public static decode(string: string): Structure {
		const { privateKey, compressed, version } = decode(string);

		return { version, privateKey: privateKey.toString("hex"), compressed };
	}
}
