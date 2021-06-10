import { Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class TransactionService extends Services.AbstractTransactionService {
	#private;
	private readonly addressService;
	transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData>;
	private onPostConstruct;
}
