import Joi from "joi";

import { baseSchema, makeCoin } from "../helpers";

export const registerTransaction = () => [
	{
		name: "transaction.transfer",
		async method(input) {
			const coin = await makeCoin(input.coin, input.network);
			const signedTransaction = await coin.transaction().transfer({
				...input,
				signatory: await coin.signatory().mnemonic(input.mnemonic),
			});

			return {
				id: signedTransaction.id(),
				data: signedTransaction.toBroadcast(),
			};
		},
		schema: Joi.object({
			...baseSchema,
			// Specific
			data: Joi.object({
				amount: Joi.string().required(),
				to: Joi.string().required(),
				memo: Joi.string(),
				expiration: Joi.number(),
			}),
			// Shared
			fee: Joi.string(),
			feeLimit: Joi.string(),
			nonce: Joi.string(),
			from: Joi.string(),
			sign: Joi.object({
				mnemonic: Joi.string(),
				mnemonics: Joi.array().items(Joi.string()),
				secondMnemonic: Joi.string(),
				wif: Joi.string(),
				secondWif: Joi.string(),
				privateKey: Joi.string(),
				multiSignature: Joi.object({
					min: Joi.number(),
					publicKeys: Joi.array().items(Joi.string()),
				}),
				senderPublicKey: Joi.string(),
				signature: Joi.string(),
			}),
			contract: Joi.object({
				address: Joi.string(),
			}),
		}).required(),
	},
];
