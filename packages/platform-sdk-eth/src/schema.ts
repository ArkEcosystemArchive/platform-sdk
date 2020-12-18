import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";

export const schema: any = ValidatorSchema.object({
	// network: ValidatorSchema.string().allow("eth.mainnet", "eth.ropsten", "eth.rinkeby", "eth.goerli", "eth.kovan"),
	network: ValidatorSchema.string().allow("eth.mainnet"),
	peer: ValidatorSchema.string().uri(),
	peerMultiSignature: ValidatorSchema.string().uri(),
	httpClient: ValidatorSchema.object(),
	services: ValidatorSchema.object({
		ledger: ValidatorSchema.object({ transport: ValidatorSchema.any() }),
	}).default(undefined),
});
