import { Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class TransactionService extends Services.AbstractTransactionService {
	#private;
	private onPostConstruct;
	transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData>;
	vote(input: Services.VoteInput): Promise<Contracts.SignedTransactionData>;
}
