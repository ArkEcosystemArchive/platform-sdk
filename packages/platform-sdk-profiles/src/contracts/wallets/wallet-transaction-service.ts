import { Contracts } from "@arkecosystem/platform-sdk";

type SignedTransactionDataDictionary = Record<string, Contracts.SignedTransactionData>;

export interface ITransactionService {
	sync(): Promise<void>;
	addSignature(id: string, mnemonic: string): Promise<void>;
	signTransfer(input: Contracts.TransferInput, options: Contracts.TransactionOptions): Promise<string>;
	signSecondSignature(input: Contracts.SecondSignatureInput, options: Contracts.TransactionOptions): Promise<string>;
	signDelegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options: Contracts.TransactionOptions,
	): Promise<string>;
	signVote(input: Contracts.VoteInput, options: Contracts.TransactionOptions): Promise<string>;
	signMultiSignature(input: Contracts.MultiSignatureInput, options: Contracts.TransactionOptions): Promise<string>;
	signIpfs(input: Contracts.IpfsInput, options: Contracts.TransactionOptions): Promise<string>;
	signMultiPayment(input: Contracts.MultiPaymentInput, options: Contracts.TransactionOptions): Promise<string>;
	signDelegateResignation(
		input: Contracts.DelegateResignationInput,
		options: Contracts.TransactionOptions,
	): Promise<string>;
	signHtlcLock(input: Contracts.HtlcLockInput, options: Contracts.TransactionOptions): Promise<string>;
	signHtlcClaim(input: Contracts.HtlcClaimInput, options: Contracts.TransactionOptions): Promise<string>;
	signHtlcRefund(input: Contracts.HtlcRefundInput, options: Contracts.TransactionOptions): Promise<string>;
	transaction(id: string): Contracts.SignedTransactionData;
	pending(): SignedTransactionDataDictionary;
	signed(): SignedTransactionDataDictionary;
	broadcasted(): SignedTransactionDataDictionary;
	waitingForOurSignature(): SignedTransactionDataDictionary;
	waitingForOtherSignatures(): SignedTransactionDataDictionary;
	hasBeenSigned(id: string): boolean;
	hasBeenBroadcasted(id: string): boolean;
	hasBeenConfirmed(id: string): boolean;
	isAwaitingConfirmation(id: string): boolean;
	isAwaitingOurSignature(id: string): boolean;
	isAwaitingOtherSignatures(id: string): boolean;
	isAwaitingSignatureByPublicKey(id: string, publicKey: string): boolean;
	canBeSigned(id: string): boolean;
	canBeBroadcasted(id: string): boolean;
	broadcast(id: string): Promise<Contracts.BroadcastResponse>;
	confirm(id: string): Promise<boolean>;
	dump(): void;
	restore(): void;
}
