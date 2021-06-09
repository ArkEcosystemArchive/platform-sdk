import Joi from "joi";

import { baseSchema, makeCoin } from "../../helpers";

export const registerKeys = () => [
	{
		name: "identity.keyPair.fromMnemonic",
		async method({ coin, network, mnemonic }) {
			return (await makeCoin({ coin, network })).keyPair().fromMnemonic(mnemonic);
		},
		schema: Joi.object({ ...baseSchema, mnemonic: Joi.string().required() }).required(),
	},
	{
		name: "identity.keyPair.fromPrivateKey",
		async method({ coin, network, privateKey }) {
			return (await makeCoin({ coin, network })).keyPair().fromPrivateKey(privateKey);
		},
		schema: Joi.object({ ...baseSchema, privateKey: Joi.string().required() }).required(),
	},
	{
		name: "identity.keyPair.fromWIF",
		async method({ coin, network, wif }) {
			return (await makeCoin({ coin, network })).keyPair().fromWIF(wif);
		},
		schema: Joi.object({ ...baseSchema, wif: Joi.string().required() }).required(),
	},
];
