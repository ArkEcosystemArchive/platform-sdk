import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object({
	network: ValidatorSchema.string().valid("xlm.mainnet", "xlm.testnet"),
	httpClient: ValidatorSchema.object(),
});
