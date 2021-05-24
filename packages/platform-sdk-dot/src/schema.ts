import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema: any = ValidatorSchema.object({
	network: ValidatorSchema.string().valid("dot.mainnet", "ksm.mainnet"),
	httpClient: ValidatorSchema.object(),
	services: ValidatorSchema.object({
		ledger: ValidatorSchema.object({ transport: ValidatorSchema.any() }),
	}).default(undefined),
});
