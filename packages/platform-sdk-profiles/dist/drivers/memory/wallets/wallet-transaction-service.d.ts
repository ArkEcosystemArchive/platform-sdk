import { Contracts, Signatories, Services } from "@arkecosystem/platform-sdk";
import { IReadWriteWallet, ITransactionService } from "../../../contracts";
declare type SignedTransactionDataDictionary = Record<string, Contracts.SignedTransactionData>;
export declare class TransactionService implements ITransactionService {
	#private;
	constructor(wallet: IReadWriteWallet);
	/** {@inheritDoc ITransactionService.sync} */
	sync(): Promise<void>;
	/** {@inheritDoc ITransactionService.addSignature} */
	addSignature(id: string, signatory: Signatories.Signatory): Promise<void>;
	/** {@inheritDoc ITransactionService.signTransfer} */
	signTransfer(input: Services.TransferInput): Promise<string>;
	/** {@inheritDoc ITransactionService.signSecondSignature} */
	signSecondSignature(input: Services.SecondSignatureInput): Promise<string>;
	/** {@inheritDoc ITransactionService.signDelegateRegistration} */
	signDelegateRegistration(input: Services.DelegateRegistrationInput): Promise<string>;
	/** {@inheritDoc ITransactionService.signVote} */
	signVote(input: Services.VoteInput): Promise<string>;
	/** {@inheritDoc ITransactionService.signMultiSignature} */
	signMultiSignature(input: Services.MultiSignatureInput): Promise<string>;
	/** {@inheritDoc ITransactionService.signIpfs} */
	signIpfs(input: Services.IpfsInput): Promise<string>;
	/** {@inheritDoc ITransactionService.signMultiPayment} */
	signMultiPayment(input: Services.MultiPaymentInput): Promise<string>;
	/** {@inheritDoc ITransactionService.signDelegateResignation} */
	signDelegateResignation(input: Services.DelegateResignationInput): Promise<string>;
	/** {@inheritDoc ITransactionService.signHtlcLock} */
	signHtlcLock(input: Services.HtlcLockInput): Promise<string>;
	/** {@inheritDoc ITransactionService.signHtlcClaim} */
	signHtlcClaim(input: Services.HtlcClaimInput): Promise<string>;
	/** {@inheritDoc ITransactionService.signHtlcRefund} */
	signHtlcRefund(input: Services.HtlcRefundInput): Promise<string>;
	/** {@inheritDoc ITransactionService.transaction} */
	transaction(id: string): Contracts.SignedTransactionData;
	/** {@inheritDoc ITransactionService.pending} */
	pending(): SignedTransactionDataDictionary;
	/** {@inheritDoc ITransactionService.signed} */
	signed(): SignedTransactionDataDictionary;
	/** {@inheritDoc ITransactionService.broadcasted} */
	broadcasted(): SignedTransactionDataDictionary;
	/** {@inheritDoc ITransactionService.waitingForOurSignature} */
	waitingForOurSignature(): SignedTransactionDataDictionary;
	/** {@inheritDoc ITransactionService.waitingForOtherSignatures} */
	waitingForOtherSignatures(): SignedTransactionDataDictionary;
	/** {@inheritDoc ITransactionService.hasBeenSigned} */
	hasBeenSigned(id: string): boolean;
	/** {@inheritDoc ITransactionService.hasBeenBroadcasted} */
	hasBeenBroadcasted(id: string): boolean;
	/** {@inheritDoc ITransactionService.hasBeenConfirmed} */
	hasBeenConfirmed(id: string): boolean;
	/** {@inheritDoc ITransactionService.isAwaitingConfirmation} */
	isAwaitingConfirmation(id: string): boolean;
	/** {@inheritDoc ITransactionService.isAwaitingOurSignature} */
	isAwaitingOurSignature(id: string): boolean;
	/** {@inheritDoc ITransactionService.isAwaitingOtherSignatures} */
	isAwaitingOtherSignatures(id: string): boolean;
	/** {@inheritDoc ITransactionService.isAwaitingSignatureByPublicKey} */
	isAwaitingSignatureByPublicKey(id: string, publicKey: string): boolean;
	/** {@inheritDoc ITransactionService.canBeSigned} */
	canBeSigned(id: string): boolean;
	/** {@inheritDoc ITransactionService.canBeBroadcasted} */
	canBeBroadcasted(id: string): boolean;
	/** {@inheritDoc ITransactionService.broadcast} */
	broadcast(id: string): Promise<Services.BroadcastResponse>;
	/** {@inheritDoc ITransactionService.confirm} */
	confirm(id: string): Promise<boolean>;
	/** {@inheritDoc ITransactionService.fromPublicKey} */
	dump(): void;
	/** {@inheritDoc ITransactionService.fromPublicKey} */
	restore(): void;
}
export {};
