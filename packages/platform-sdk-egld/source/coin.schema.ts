import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object({
	network: ValidatorSchema.string().valid("egld.mainnet", "egld.testnet"),
	httpClient: ValidatorSchema.object(),
});
