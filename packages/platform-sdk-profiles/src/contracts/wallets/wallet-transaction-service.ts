import { Contracts, Signatories } from "@arkecosystem/platform-sdk";

type SignedTransactionDataDictionary = Record<string, Contracts.SignedTransactionData>;

/**
 * Defines the implementation contract for the transaction service.
 *
 * @remarks
 * This class is responsible for managing the state of all transactions that
 * belong to a wallet. This includes signing, broadcasting and confirming.
 *
 * Internally a UUID and transaction ID are used. The UUID is generated by
 * this package and the transaction ID is computed by the coin implementation.
 *
 * The transaction ID can either be created online or offline. Most coins will
 * provide the transaction ID offline but there are exception which will require
 * the transaction to be broadcasted and then return the ID.
 *
 * In such cases the coin implementation will generate a temporary UUID that
 * will be used until the transaction has been broadcasted, at which point
 * we will swap out the UUID for the real transaction ID which we received.
 *
 * @export
 * @interface ITransactionService
 */
export interface ITransactionService {
	/**
	 * Sync both pending and ready multi signature transactions.
	 *
	 * @return {Promise<void>}
	 * @memberof ITransactionService
	 */
	sync(): Promise<void>;

	/**
	 * Sign the transaction for the given ID with the given mnemonic.
	 *
	 * @param {string} id
	 * @param {Signatories.Signatory} signatory
	 * @return {Promise<void>}
	 * @memberof ITransactionService
	 */
	addSignature(id: string, signatory: Signatories.Signatory): Promise<void>;

	/**
	 * Sign a Transfer transaction.
	 *
	 * @param {Services.TransferInput} input
	 * @param {Services.TransactionOptions} options
	 * @return {Promise<string>}
	 * @memberof ITransactionService
	 */
	signTransfer(input: Services.TransferInput, options?: Services.TransactionOptions): Promise<string>;

	/**
	 * Sign a Second-Signature Registration transaction.
	 *
	 * @param {Services.SecondSignatureInput} input
	 * @param {Services.TransactionOptions} options
	 * @return {Promise<string>}
	 * @memberof ITransactionService
	 */
	signSecondSignature(input: Services.SecondSignatureInput, options?: Services.TransactionOptions): Promise<string>;

	/**
	 * Sign a Delegate Registration transaction.
	 *
	 * @param {Services.DelegateRegistrationInput} input
	 * @param {Services.TransactionOptions} options
	 * @return {Promise<string>}
	 * @memberof ITransactionService
	 */
	signDelegateRegistration(
		input: Services.DelegateRegistrationInput,
		options?: Services.TransactionOptions,
	): Promise<string>;

	/**
	 * Sign a Vote transaction.
	 *
	 * @param {Services.VoteInput} input
	 * @param {Services.TransactionOptions} options
	 * @return {Promise<string>}
	 * @memberof ITransactionService
	 */
	signVote(input: Services.VoteInput, options?: Services.TransactionOptions): Promise<string>;

	/**
	 * Sign a Multi-Signature Registration transaction.
	 *
	 * @param {Services.MultiSignatureInput} input
	 * @param {Services.TransactionOptions} options
	 * @return {Promise<string>}
	 * @memberof ITransactionService
	 */
	signMultiSignature(input: Services.MultiSignatureInput, options?: Services.TransactionOptions): Promise<string>;

	/**
	 * Sign an IPFS transaction.
	 *
	 * @param {Services.IpfsInput} input
	 * @param {Services.TransactionOptions} options
	 * @return {Promise<string>}
	 * @memberof ITransactionService
	 */
	signIpfs(input: Services.IpfsInput, options?: Services.TransactionOptions): Promise<string>;

	/**
	 * Sign a Multi-Payment transaction.
	 *
	 * @param {Services.MultiPaymentInput} input
	 * @param {Services.TransactionOptions} options
	 * @return {Promise<string>}
	 * @memberof ITransactionService
	 */
	signMultiPayment(input: Services.MultiPaymentInput, options?: Services.TransactionOptions): Promise<string>;

	/**
	 * Sign a Delegate Resignation transaction.
	 *
	 * @param {Services.DelegateResignationInput} input
	 * @param {Services.TransactionOptions} options
	 * @return {Promise<string>}
	 * @memberof ITransactionService
	 */
	signDelegateResignation(
		input: Services.DelegateResignationInput,
		options?: Services.TransactionOptions,
	): Promise<string>;

	/**
	 * Sign a HTLC Lock transaction.
	 *
	 * @param {Services.HtlcLockInput} input
	 * @param {Services.TransactionOptions} options
	 * @return {Promise<string>}
	 * @memberof ITransactionService
	 */
	signHtlcLock(input: Services.HtlcLockInput, options?: Services.TransactionOptions): Promise<string>;

	/**
	 * Sign a HTLC Claim transaction.
	 *
	 * @param {Services.HtlcClaimInput} input
	 * @param {Services.TransactionOptions} options
	 * @return {Promise<string>}
	 * @memberof ITransactionService
	 */
	signHtlcClaim(input: Services.HtlcClaimInput, options?: Services.TransactionOptions): Promise<string>;

	/**
	 * Sign a HTLC Refund transaction.
	 *
	 * @param {Services.HtlcRefundInput} input
	 * @param {Services.TransactionOptions} options
	 * @return {Promise<string>}
	 * @memberof ITransactionService
	 */
	signHtlcRefund(input: Services.HtlcRefundInput, options?: Services.TransactionOptions): Promise<string>;

	/**
	 * Get the transaction for the given ID if it is exists with any valid state.
	 *
	 * @param {string} id
	 * @return {Contracts.SignedTransactionData}
	 * @memberof ITransactionService
	 */
	transaction(id: string): Contracts.SignedTransactionData;

	/**
	 * Get all transactions that are pending in some state.
	 *
	 * @return {SignedTransactionDataDictionary}
	 * @memberof ITransactionService
	 */
	pending(): SignedTransactionDataDictionary;

	/**
	 * Get all transactions that have been signed.
	 *
	 * @return {SignedTransactionDataDictionary}
	 * @memberof ITransactionService
	 */
	signed(): SignedTransactionDataDictionary;

	/**
	 * Get all transactions that have been broadcasted.
	 *
	 * @return {SignedTransactionDataDictionary}
	 * @memberof ITransactionService
	 */
	broadcasted(): SignedTransactionDataDictionary;

	/**
	 * Get all transactions that are waiting for your signature.
	 *
	 * @return {SignedTransactionDataDictionary}
	 * @memberof ITransactionService
	 */
	waitingForOurSignature(): SignedTransactionDataDictionary;

	/**
	 * Get all transactions that are waiting for the signatures of other participants.
	 *
	 * @return {SignedTransactionDataDictionary}
	 * @memberof ITransactionService
	 */
	waitingForOtherSignatures(): SignedTransactionDataDictionary;

	/**
	 * Check if the given ID has been signed.
	 *
	 * @param {string} id
	 * @return {boolean}
	 * @memberof ITransactionService
	 */
	hasBeenSigned(id: string): boolean;

	/**
	 * Check if the given ID has been broadcasted.
	 *
	 * @param {string} id
	 * @return {boolean}
	 * @memberof ITransactionService
	 */
	hasBeenBroadcasted(id: string): boolean;

	/**
	 * Check if the given ID has been confirmed.
	 *
	 * @param {string} id
	 * @return {boolean}
	 * @memberof ITransactionService
	 */
	hasBeenConfirmed(id: string): boolean;

	/**
	 * Check if the given ID is waiting to be confirmed.
	 *
	 * @param {string} id
	 * @return {boolean}
	 * @memberof ITransactionService
	 */
	isAwaitingConfirmation(id: string): boolean;

	/**
	 * Check if the given ID is waiting for your signature.
	 *
	 * @param {string} id
	 * @return {boolean}
	 * @memberof ITransactionService
	 */
	isAwaitingOurSignature(id: string): boolean;

	/**
	 * Check if the given ID is waiting for signatures of other participants.
	 *
	 * @param {string} id
	 * @return {boolean}
	 * @memberof ITransactionService
	 */
	isAwaitingOtherSignatures(id: string): boolean;

	/**
	 * Check if the given ID is waiting for a signature from the given public key.
	 *
	 * @param {string} id
	 * @param {string} publicKey
	 * @return {boolean}
	 * @memberof ITransactionService
	 */
	isAwaitingSignatureByPublicKey(id: string, publicKey: string): boolean;

	/**
	 * Check if the given transaction for the given ID can be signed.
	 *
	 * @param {string} id
	 * @return {boolean}
	 * @memberof ITransactionService
	 */
	canBeSigned(id: string): boolean;

	/**
	 * Check if the given transaction for the given ID can be broadcasted.
	 *
	 * @param {string} id
	 * @return {boolean}
	 * @memberof ITransactionService
	 */
	canBeBroadcasted(id: string): boolean;

	/**
	 * Broadcast the given ID.
	 *
	 * @param {string} id
	 * @return {Promise<Services.BroadcastResponse>}
	 * @memberof ITransactionService
	 */
	broadcast(id: string): Promise<Services.BroadcastResponse>;

	/**
	 * Check if the given ID has been confirmed by the respective network.
	 *
	 * @param {string} id
	 * @return {Promise<boolean>}
	 * @memberof ITransactionService
	 */
	confirm(id: string): Promise<boolean>;

	/**
	 * Dump the transactions as JSON strings.
	 *
	 * @memberof ITransactionService
	 */
	dump(): void;

	/**
	 * Restore the transactions as DTO instances.
	 *
	 * @memberof ITransactionService
	 */
	restore(): void;
}
