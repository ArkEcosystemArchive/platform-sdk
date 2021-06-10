import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object({
	network: ValidatorSchema.string().valid("nano.mainnet", "nano.testnet"),
	httpClient: ValidatorSchema.object(),
});
