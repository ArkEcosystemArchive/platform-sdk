import Joi from "joi";

import { baseSchema, makeCoin } from "../../helpers";

export const registerPublicKey = () => [
	{
		name: "identity.publicKey.fromMnemonic",
		async method({ coin, network, mnemonic }) {
			return (await makeCoin({ coin, network })).identity().publicKey().fromMnemonic(mnemonic);
		},
		schema: Joi.object({ ...baseSchema, mnemonic: Joi.string().required() }).required(),
	},
	{
		name: "identity.publicKey.fromMultiSignature",
		async method({ coin, network, min, publicKeys }) {
			return (await makeCoin({ coin, network })).identity().publicKey().fromMultiSignature(min, publicKeys);
		},
		schema: Joi.object({
			...baseSchema,
			min: Joi.string().required(),
			publicKeys: Joi.array().items(Joi.string()),
		}).required(),
	},
	{
		name: "identity.publicKey.fromWIF",
		async method({ coin, network, wif }) {
			return (await makeCoin({ coin, network })).identity().publicKey().fromWIF(wif);
		},
		schema: Joi.object({ ...baseSchema, wif: Joi.string().required() }).required(),
	},
];
