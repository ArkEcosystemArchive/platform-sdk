import { picasso } from "@vechain/picasso";
import mem from "mem";

import { IAvatar } from "../contracts";

export class Avatar implements IAvatar {
	public static make(seed: string): string {
		return mem(picasso)(seed);
	}
}
