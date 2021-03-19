import { Coins } from "@arkecosystem/platform-sdk";
import Joi from "joi";

export const registerClient = (coin: Coins.Coin) => [
	{
		name: "client.transaction",
		async method({ id }) {
			return (await coin.client().transaction(id)).toObject();
		},
		schema: Joi.object({
			id: Joi.string().required(),
		}).required(),
	},
	{
		name: "client.wallet",
		async method({ id }) {
			return (await coin.client().wallet(id)).toObject();
		},
		schema: Joi.object({
			id: Joi.string().required(),
		}).required(),
	},
	{
		name: "client.delegate",
		async method({ id }) {
			return (await coin.client().delegate(id)).toObject();
		},
		schema: Joi.object({
			id: Joi.string().required(),
		}).required(),
	},
	{
		name: "client.syncing",
		async method() {
			return coin.client().syncing();
		},
	},
	{
		name: "client.broadcast",
		async method({ id, data }) {
			// @ts-ignore
			return coin.client().broadcast([{
				id: () => id,
				toBroadcast: () => data,
			}]);
		},
		schema: Joi.object({
			id: Joi.string().required(),
			data: Joi.any().required(),
		}).required(),
	},
];
