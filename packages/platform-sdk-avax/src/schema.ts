import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object({
	network: ValidatorSchema.string().valid("avax.mainnet", "avax.testnet"),
	httpClient: ValidatorSchema.object(),
});
