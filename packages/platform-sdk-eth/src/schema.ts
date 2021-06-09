import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object({
	// network: ValidatorSchema.string().valid("eth.mainnet", "eth.ropsten", "eth.rinkeby", "eth.goerli", "eth.kovan"),
	network: ValidatorSchema.string().valid("eth.mainnet"),
	httpClient: ValidatorSchema.object(),
});
