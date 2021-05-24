import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema: any = ValidatorSchema.object({
	// network: ValidatorSchema.string().valid("eth.mainnet", "eth.ropsten", "eth.rinkeby", "eth.goerli", "eth.kovan"),
	network: ValidatorSchema.string().valid("eth.mainnet"),
	httpClient: ValidatorSchema.object(),
	services: ValidatorSchema.object({
		ledger: ValidatorSchema.object({ transport: ValidatorSchema.any() }),
	}).default(undefined),
});
