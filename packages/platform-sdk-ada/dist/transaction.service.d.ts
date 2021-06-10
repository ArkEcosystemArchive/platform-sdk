import { Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class TransactionService extends Services.AbstractTransactionService {
	transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData>;
	estimateExpiration(value?: string): Promise<string | undefined>;
}
