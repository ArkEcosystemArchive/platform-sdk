import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object({
	network: ValidatorSchema.string().valid("zil.mainnet", "zil.testnet"),
	httpClient: ValidatorSchema.object(),
});
