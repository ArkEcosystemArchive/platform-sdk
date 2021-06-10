import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object({
	network: ValidatorSchema.string().valid(
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
	httpClient: ValidatorSchema.object(),
});
