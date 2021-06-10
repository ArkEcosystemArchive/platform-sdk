import { Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class TransactionService extends Services.AbstractTransactionService {
	#private;
	private readonly keyPairService;
	private onPostConstruct;
	transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData>;
}
