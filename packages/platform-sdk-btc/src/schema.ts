import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object({
	network: ValidatorSchema.string().valid("btc.livenet", "btc.testnet"),
	httpClient: ValidatorSchema.object(),
});
