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
		name: "client.syncing",
		async method({ coin, network }) {
			return (await makeCoin(coin, network)).client().syncing();
		},
	},
	{
		name: "client.broadcast",
		async method({ coin, network, id, data }) {
			// @ts-ignore
			return (await makeCoin(coin, network)).client().broadcast([
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
