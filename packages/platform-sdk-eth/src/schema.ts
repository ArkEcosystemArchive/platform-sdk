import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object().shape({
	// network: ValidatorSchema.string().oneOf(["mainnet", "ropsten", "rinkeby", "goerli", "kovan"]),
	network: ValidatorSchema.string().oneOf(["mainnet"]),
	peer: ValidatorSchema.string().url().notRequired(),
	peerMultiSignature: ValidatorSchema.string().url().notRequired(),
	httpClient: ValidatorSchema.object(),
	services: ValidatorSchema.object()
		.shape({
			ledger: ValidatorSchema.object().shape({ transport: ValidatorSchema.mixed().notRequired() }),
		})
		.default(undefined),
});
