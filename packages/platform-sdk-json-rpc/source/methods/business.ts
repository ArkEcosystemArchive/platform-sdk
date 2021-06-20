import Joi from "joi";

import { baseSchema, makeCoin } from "../helpers";

export const registerBusiness = () => [
	{
		name: "business.withdraw",
		async method({ coin, network, amount, to, mnemonic }) {
			const business = await makeCoin({ coin, network });

			return business.client().broadcast([
				await business.transaction().transfer({
					data: {
						amount: Number.parseFloat(amount) - (await business.fee().all()).transfer.avg.toHuman(),
						to,
					},
					signatory: await business.signatory().mnemonic(mnemonic),
				})
			]);
		},
		schema: Joi.object({
			...baseSchema,
			amount: Joi.number().required(),
			to: Joi.string().required(),
			mnemonic: Joi.string().required(),
		}).required(),
	},
];
