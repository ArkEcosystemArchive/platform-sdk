import { Coins } from "@arkecosystem/platform-sdk";
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import Logger from "@ptkdev/logger";

const coins: Record<string, Coins.Coin> = {};
export const makeCoin = async (coin: string, network: string): Coins.Coin => {
	if (coins[coin]) {
		return coins[coin];
	}

	coins[coin] = await Coins.CoinFactory.make({ ARK }[coin], {
		network,
		httpClient: new Request(),
	});

	return coins[coin];
}

export const useLogger = (): Logger => new Logger();
