import Joi from "joi";

import { baseSchema, makeCoin } from "../helpers";

export const registerClient = () => [
	{
		name: "client.transaction",
		async method({ coin, network, id }) {
			return (await (await makeCoin(coin, network)).client().transaction(id)).toObject();
		},
		schema: Joi.object({
			...baseSchema,
			id: Joi.string().required(),
		}).required(),
	},
	{
		name: "client.transactions",
		async method(input) {
			const coin = await makeCoin(input.coin, input.network);
			const transactions = await coin.client().transactions(input);

			return {
				meta: {
					prev: transactions.previousPage(),
					self: transactions.currentPage(),
					next: transactions.nextPage(),
					last: transactions.lastPage(),
				},
				data: transactions.items().map((transaction) => transaction.toObject()),
			};
		},
		schema: Joi.object({
			...baseSchema,
			// Pagination
			cursor: Joi.string(),
			limit: Joi.number().positive(),
			orderBy: Joi.string(),
			// Data
			address: Joi.string(),
			addresses: Joi.array().items(Joi.string()),
			senderId: Joi.string(),
			recipientId: Joi.string(),
			walletId: Joi.string(),
			senderPublicKey: Joi.string(),
			recipientPublicKey: Joi.string(),
			asset: Joi.object(),
			type: Joi.number(),
			typeGroup: Joi.number(),
		}).required(),
	},
	{
		name: "client.wallet",
		async method({ coin, network, id }) {
			return (await (await makeCoin(coin, network)).client().wallet(id)).toObject();
		},
		schema: Joi.object({
			...baseSchema,
			id: Joi.string().required(),
		}).required(),
	},
	{
		name: "client.delegate",
		async method({ coin, network, id }) {
			return (await (await makeCoin(coin, network)).client().delegate(id)).toObject();
		},
		schema: Joi.object({
			...baseSchema,
			id: Joi.string().required(),
		}).required(),
	},
	{
		name: "client.broadcast",
		async method({ coin, network, id, data }) {
			return (await makeCoin(coin, network)).client().broadcast([
				// @ts-ignore
				{
					id: () => id,
					toBroadcast: () => data,
				},
			]);
		},
		schema: Joi.object({
			...baseSchema,
			id: Joi.string().required(),
			data: Joi.any().required(),
		}).required(),
	},
];
