import Joi from "joi";

import { baseSchema, makeCoin } from "../../helpers";

export const registerKeys = () => [
	{
		name: "identity.keys.fromMnemonic",
		async method({ coin, network, mnemonic }) {
			return (await makeCoin(coin, network)).identity().keys().fromMnemonic(mnemonic);
		},
		schema: Joi.object({ ...baseSchema, mnemonic: Joi.string().required() }).required(),
	},
	{
		name: "identity.keys.fromPrivateKey",
		async method({ coin, network, privateKey }) {
			return (await makeCoin(coin, network)).identity().keys().fromPrivateKey(privateKey);
		},
		schema: Joi.object({ ...baseSchema, privateKey: Joi.string().required() }).required(),
	},
	{
		name: "identity.keys.fromWIF",
		async method({ coin, network, wif }) {
			return (await makeCoin(coin, network)).identity().keys().fromWIF(wif);
		},
		schema: Joi.object({ ...baseSchema, wif: Joi.string().required() }).required(),
	},
];
