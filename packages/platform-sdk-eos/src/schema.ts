import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object().shape({
	network: ValidatorSchema.string().oneOf([
		"eos.mainnet",
		"eos.testnet",
		"telos.mainnet",
		"telos.testnet",
		"wax.mainnet",
		"worbli.mainnet",
		"worbli.testnet",
		"meetone.mainnet",
		"bos.mainnet",
	]),
	peer: ValidatorSchema.string().url().notRequired(),
});
