import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object({
	network: ValidatorSchema.string().allow("lsk.mainnet", "lsk.testnet", "lsk.betanet"),
	peer: ValidatorSchema.string().uri(),
	peerMultiSignature: ValidatorSchema.string().uri(),
	httpClient: ValidatorSchema.object(),
	services: ValidatorSchema.object({
		ledger: ValidatorSchema.object({
			transport: ValidatorSchema.any(),
		}),
	}).default(undefined),
});
