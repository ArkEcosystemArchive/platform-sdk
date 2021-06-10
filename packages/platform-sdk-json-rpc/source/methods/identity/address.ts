import Joi from "joi";

import { baseSchema, makeCoin } from "../../helpers";

export const registerAddress = () => [
	{
		name: "identity.address.fromMnemonic",
		async method({ coin, network, mnemonic }) {
			return (await makeCoin({ coin, network })).address().fromMnemonic(mnemonic);
		},
		schema: Joi.object({ ...baseSchema, mnemonic: Joi.string().required() }).required(),
	},
	{
		name: "identity.address.fromMultiSignature",
		async method({ coin, network, min, publicKeys }) {
			return (await makeCoin({ coin, network })).address().fromMultiSignature(min, publicKeys);
		},
		schema: Joi.object({
			...baseSchema,
			min: Joi.string().required(),
			publicKeys: Joi.array().items(Joi.string()),
		}).required(),
	},
	{
		name: "identity.address.fromPublicKey",
		async method({ coin, network, publicKey }) {
			return (await makeCoin({ coin, network })).address().fromPublicKey(publicKey);
		},
		schema: Joi.object({ ...baseSchema, publicKey: Joi.string().required() }).required(),
	},
	{
		name: "identity.address.fromPrivateKey",
		async method({ coin, network, privateKey }) {
			return (await makeCoin({ coin, network })).address().fromPrivateKey(privateKey);
		},
		schema: Joi.object({ ...baseSchema, privateKey: Joi.string().required() }).required(),
	},
	{
		name: "identity.address.fromWIF",
		async method({ coin, network, wif }) {
			return (await makeCoin({ coin, network })).address().fromWIF(wif);
		},
		schema: Joi.object({ ...baseSchema, wif: Joi.string().required() }).required(),
	},
	{
		name: "identity.validate",
		async method({ coin, network, address }) {
			return (await makeCoin({ coin, network })).address().validate(address);
		},
		schema: Joi.object({ ...baseSchema, address: Joi.string().required() }).required(),
	},
];
