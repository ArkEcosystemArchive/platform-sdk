import { Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class TransactionService extends Services.AbstractTransactionService {
	#private;
	private readonly addressService;
	private readonly privateKeyService;
	private onPostConstruct;
	transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData>;
}
