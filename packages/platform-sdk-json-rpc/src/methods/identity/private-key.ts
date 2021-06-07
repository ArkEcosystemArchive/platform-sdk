import Joi from "joi";

import { baseSchema, makeCoin } from "../../helpers";

export const registerPrivateKey = () => [
	{
		name: "identity.privateKey.fromMnemonic",
		async method({ coin, network, mnemonic }) {
			return (await makeCoin({ coin, network })).privateKey().fromMnemonic(mnemonic);
		},
		schema: Joi.object({ ...baseSchema, mnemonic: Joi.string().required() }).required(),
	},
	{
		name: "identity.privateKey.fromWIF",
		async method({ coin, network, wif }) {
			return (await makeCoin({ coin, network })).privateKey().fromWIF(wif);
		},
		schema: Joi.object({ ...baseSchema, wif: Joi.string().required() }).required(),
	},
];
