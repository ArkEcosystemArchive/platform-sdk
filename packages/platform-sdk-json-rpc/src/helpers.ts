import { Coins } from "@arkecosystem/platform-sdk";
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import Logger from "@ptkdev/logger";
import Joi from "joi";

const coins: Record<string, Coins.Coin> = {};

export const makeCoin = async (coin: string, network: string): Coins.Coin => {
	const cacheKey = `${coin}.${network}`;

	if (coins[cacheKey]) {
		return coins[cacheKey];
	}

	coins[cacheKey] = await Coins.CoinFactory.make({ ARK }[coin], {
		network,
		httpClient: new Request(),
	});

	return coins[cacheKey];
};

export const useLogger = (): Logger => new Logger();

export const baseSchema = {
	coin: Joi.string().required(),
	network: Joi.string().required(),
};
