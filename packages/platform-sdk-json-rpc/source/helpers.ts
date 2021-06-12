import { Coins } from "@arkecosystem/platform-sdk";
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import Joi from "joi";

const coins: Record<string, Coins.Coin> = {};

export const makeCoin = async (input: Record<string, string>): Promise<Coins.Coin> => {
	const cacheKey = `${input.coin}.${input.network}`;

	if (coins[cacheKey]) {
		delete input.coin;
		delete input.network;

		return coins[cacheKey];
	}

	coins[cacheKey] = Coins.CoinFactory.make({ ARK }[input.coin]!, {
		network: input.network,
		httpClient: new Request(),
	});

	await coins[cacheKey].__construct();

	delete input.coin;
	delete input.network;

	return coins[cacheKey];
};

export const useLogger = (): Console => console;

export const baseSchema = {
	coin: Joi.string().required(),
	network: Joi.string().required(),
};
