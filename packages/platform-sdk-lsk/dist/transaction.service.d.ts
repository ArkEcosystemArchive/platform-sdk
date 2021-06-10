import { Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class TransactionService extends Services.AbstractTransactionService {
	#private;
	private readonly ledgerService;
	private onPostConstruct;
	transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData>;
	secondSignature(input: Services.SecondSignatureInput): Promise<Contracts.SignedTransactionData>;
	delegateRegistration(input: Services.DelegateRegistrationInput): Promise<Contracts.SignedTransactionData>;
	vote(input: Services.VoteInput): Promise<Contracts.SignedTransactionData>;
	multiSignature(input: Services.MultiSignatureInput): Promise<Contracts.SignedTransactionData>;
}
