import Joi from "@hapi/joi";

export const schema = Joi.object({
	network: Joi.string().allow("livenet", "testnet"),
	peer: Joi.string().uri().optional(),
});
