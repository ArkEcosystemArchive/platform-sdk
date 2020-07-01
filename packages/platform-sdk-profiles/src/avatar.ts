import { picasso } from "@vechain/picasso";

export class Avatar {
	public static make(seed: string): string {
		return picasso(seed);
	}
}
