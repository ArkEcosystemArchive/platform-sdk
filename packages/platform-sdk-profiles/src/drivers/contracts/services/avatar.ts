import { picasso } from "@vechain/picasso";
import mem from "mem";

export interface IAvatar {
    make(seed: string): string;
}
