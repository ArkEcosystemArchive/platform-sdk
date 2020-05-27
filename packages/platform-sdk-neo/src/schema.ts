import Joi from "@hapi/joi";

export const schema = Joi.object({
	network: Joi.string().allow("mainnet", "testnet"),
	peer: Joi.string().uri().optional(),
	httpClient: Joi.object(),
});
