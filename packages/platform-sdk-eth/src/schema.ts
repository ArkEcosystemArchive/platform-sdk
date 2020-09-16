import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema = ValidatorSchema.object().shape({
	// network: ValidatorSchema.string().oneOf(["eth.mainnet", "eth.ropsten", "eth.rinkeby", "eth.goerli", "eth.kovan"]),
	network: ValidatorSchema.string().oneOf(["eth.mainnet"]),
	peer: ValidatorSchema.string().url().notRequired(),
	peerMultiSignature: ValidatorSchema.string().url().notRequired(),
	httpClient: ValidatorSchema.object(),
	services: ValidatorSchema.object()
		.shape({
			ledger: ValidatorSchema.object().shape({ transport: ValidatorSchema.mixed().notRequired() }),
		})
		.default(undefined),
});
