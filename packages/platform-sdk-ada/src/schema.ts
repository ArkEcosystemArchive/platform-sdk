import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object({
	network: ValidatorSchema.string().valid("ada.mainnet", "ada.testnet"),
	httpClient: ValidatorSchema.object(),
});
