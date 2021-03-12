import { encode, decode, WIFReturn } from "wif";

export interface WIFInput {
    readonly version: number;
    readonly privateKey: string;
    readonly compressed: boolean;
}

export class WIF {
	public static encode({ version, privateKey, compressed }: WIFInput): string {
		return encode(version, Buffer.from(privateKey, "hex"), compressed);
	}

	public static decode(string: string, version?: number): WIFReturn {
		return decode(string, version);
	}
}
