import Joi from "@hapi/joi";

export const schema = Joi.object({
	network: Joi.string().allow(
		"eos.mainnet",
		"eos.testnet",
		"telos.mainnet",
		"telos.testnet",
		"wax.mainnet",
		"worbli.mainnet",
		"worbli.testnet",
		"meetone.mainnet",
		"bos.mainnet",
	),
	peer: Joi.string().uri().optional(),
});
