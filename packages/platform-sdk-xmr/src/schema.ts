import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object().shape({
	network: ValidatorSchema.string().oneOf(["xmr.mainnet", "xmr.testnet"]),
	peer: ValidatorSchema.string().url().notRequired(),
	peerMultiSignature: ValidatorSchema.string().url().notRequired(),
});
