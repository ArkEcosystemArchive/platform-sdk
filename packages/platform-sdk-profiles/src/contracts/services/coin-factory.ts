import { Coins } from "@arkecosystem/platform-sdk";

export interface ICoinFactory {
	make(coin: string, network: string, options?: object): Coins.Coin;
}
