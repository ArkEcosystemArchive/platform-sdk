import Joi from "joi";

import { baseSchema, makeCoin } from "../helpers";

export const registerBusiness = () => [
	{
		name: "business.withdraw",
		async method({ coin, network, amount, to, mnemonic }) {
			const business = await makeCoin({ coin, network });

            const transfer = await business.transaction().transfer({
                data: {
                    amount: Number.parseFloat(amount) - (await business.fee().all()).transfer.avg.toHuman(),
                    to,
                },
                signatory: await business.signatory().mnemonic(mnemonic),
            });

			await business.client().broadcast([transfer]);

            return {
				id: transfer.id(),
				sender: transfer.sender(),
				recipient: transfer.recipient(),
				amount: transfer.amount().toHuman(),
				fee: transfer.fee().toHuman(),
				timestamp: transfer.timestamp().toISOString(),
			};
		},
		schema: Joi.object({
			...baseSchema,
			amount: Joi.number().required(),
			to: Joi.string().required(),
			mnemonic: Joi.string().required(),
		}).required(),
	},
];
