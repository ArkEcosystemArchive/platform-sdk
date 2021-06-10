import { Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class TransactionService extends Services.AbstractTransactionService {
	#private;
	transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData>;
}
