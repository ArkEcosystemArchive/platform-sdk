import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema: any = ValidatorSchema.object({
	network: ValidatorSchema.string().valid("xmr.mainnet", "xmr.testnet"),
	peer: ValidatorSchema.string().uri(),
	peerMultiSignature: ValidatorSchema.string().uri(),
});
