import Joi from "joi";

import { baseSchema, makeCoin } from "../helpers";

export const registerMessage = () => [
	{
		name: "message.sign",
		async method(input) {
			const coin = await makeCoin(input);

			return coin.message().sign({
				...input,
				signatory: await coin.signatory().mnemonic(input.sign.mnemonic),
			});
		},
		schema: Joi.object({
			...baseSchema,
			message: Joi.string().required(),
			mnemonic: Joi.string().required(),
		}).required(),
	},
	{
		name: "message.verify",
		async method(input) {
			return (await makeCoin(input)).message().verify(input);
		},
		schema: Joi.object({
			...baseSchema,
			message: Joi.string().required(),
			signatory: Joi.string().required(),
			signature: Joi.string().required(),
		}).required(),
	},
];
