import { picasso } from "@vechain/picasso";
import mem from "mem";

export class Avatar {
	public static make(seed: string): string {
		return mem(picasso)(seed);
	}
}
