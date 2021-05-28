import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object({
	network: ValidatorSchema.string().valid("xrp.mainnet", "xrp.testnet"),
	httpClient: ValidatorSchema.object(),
	services: ValidatorSchema.object({
		ledger: ValidatorSchema.object({
			transport: ValidatorSchema.any(),
		}),
	}).default(undefined),
});
