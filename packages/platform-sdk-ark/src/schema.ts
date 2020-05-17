import Joi from "@hapi/joi";

export const schema = Joi.object({
	network: Joi.string().allow("mainnet", "devnet"),
	peer: Joi.string().uri().optional(),
	services: Joi.object()
		.keys({ ledger: Joi.object().keys({ transport: Joi.object() }) })
		.optional(),
});
