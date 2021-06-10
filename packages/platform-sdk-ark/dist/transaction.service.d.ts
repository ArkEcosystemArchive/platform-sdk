import { Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class TransactionService extends Services.AbstractTransactionService {
	#private;
	private readonly ledgerService;
	private readonly addressService;
	private readonly keyPairService;
	private readonly publicKeyService;
	private readonly packageCrypto;
	private readonly packageHeight;
	transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData>;
	secondSignature(input: Services.SecondSignatureInput): Promise<Contracts.SignedTransactionData>;
	delegateRegistration(input: Services.DelegateRegistrationInput): Promise<Contracts.SignedTransactionData>;
	vote(input: Services.VoteInput): Promise<Contracts.SignedTransactionData>;
	multiSignature(input: Services.MultiSignatureInput): Promise<Contracts.SignedTransactionData>;
	ipfs(input: Services.IpfsInput): Promise<Contracts.SignedTransactionData>;
	multiPayment(input: Services.MultiPaymentInput): Promise<Contracts.SignedTransactionData>;
	delegateResignation(input: Services.DelegateResignationInput): Promise<Contracts.SignedTransactionData>;
	htlcLock(input: Services.HtlcLockInput): Promise<Contracts.SignedTransactionData>;
	htlcClaim(input: Services.HtlcClaimInput): Promise<Contracts.SignedTransactionData>;
	htlcRefund(input: Services.HtlcRefundInput): Promise<Contracts.SignedTransactionData>;
	/**
	 * This method should be used to split-sign transactions in combination with the MuSig Server.
	 *
	 * @param transaction A transaction that was previously signed with a multi-signature.
	 * @param input
	 */
	multiSign(
		transaction: Contracts.RawTransactionData,
		input: Services.TransactionInputs,
	): Promise<Contracts.SignedTransactionData>;
	estimateExpiration(value?: string): Promise<string | undefined>;
	private onPostConstruct;
}
