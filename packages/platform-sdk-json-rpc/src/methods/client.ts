import { Coins } from "@arkecosystem/platform-sdk";
import Joi from "joi";

export const registerClient = (coin: Coins.Coin) => [
	{
		name: "client.broadcast",
		async method(input) {
			// @ts-ignore
			return coin.client().broadcast([{
				id: () => input.id,
				toBroadcast: () => input.data,
			}]);
		},
		schema: Joi.object({
			id: Joi.string().required(),
			data: Joi.any().required(),
		}).required(),
	},
];
