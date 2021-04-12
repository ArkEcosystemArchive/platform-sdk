import { Coins } from "@arkecosystem/platform-sdk";

export interface ICoinService {
	all(): Record<string, Coins.Coin>;
	values(): Coins.Coin[];
	entries(): [string, string[]][];
	get(coin: string, network: string): Coins.Coin;
	push(coin: string, network: string, options: object, useForce: boolean): Coins.Coin;
	has(coin: string, network: string): boolean;
}
