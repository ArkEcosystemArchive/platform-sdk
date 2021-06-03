import { Coins } from "@arkecosystem/platform-sdk";
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import Joi from "joi";

const coins: Record<string, Coins.Coin> = {};

export const makeCoin = async (coin: string, network: string): Promise<Coins.Coin> => {
	const cacheKey = `${coin}.${network}`;

	if (coins[cacheKey]) {
		return coins[cacheKey];
	}

	coins[cacheKey] = Coins.CoinFactory.make({ ARK }[coin]!, {
		network,
		httpClient: new Request(),
	});

	await coins[cacheKey].__construct();

	return coins[cacheKey];
};

export const useLogger = (): Console => console;

export const baseSchema = {
	coin: Joi.string().required(),
	network: Joi.string().required(),
};
