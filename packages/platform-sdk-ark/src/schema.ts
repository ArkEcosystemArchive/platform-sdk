import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object({
	network: ValidatorSchema.string().allow("ark.mainnet", "ark.devnet", "compendia.mainnet", "compendia.testnet"),
	peer: ValidatorSchema.string().uri(),
	peerMultiSignature: ValidatorSchema.string().uri(),
	httpClient: ValidatorSchema.object(),
	services: ValidatorSchema.object({
			ledger: ValidatorSchema.object({
				transport: ValidatorSchema.any(),
			}),
		})
		.default(undefined),
});
