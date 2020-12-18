import { SignedTransactionData } from "./data";

export type MultiSignatureTransaction = Record<string, any>;

export interface MultiSignatureService {
	/**
	 * Destroy the MultiSignatureService instance.
	 *
	 * @returns {Promise<void>}
	 * @memberof MultiSignatureService
	 */
	destruct(): Promise<void>;

	/**
	 * Retrieve all multi-signature transactions that are awaiting for a signature from the given public key.
	 *
	 * @param {string} publicKey
	 * @returns {Promise<MultiSignatureTransaction[]>}
	 * @memberof MultiSignatureService
	 */
	allWithPendingState(publicKey: string): Promise<MultiSignatureTransaction[]>;

	/**
	 * Retrieve all multi-signature transactions that have been signed by all participants.
	 *
	 * @param {string} publicKey
	 * @returns {Promise<MultiSignatureTransaction[]>}
	 * @memberof MultiSignatureService
	 */
	allWithReadyState(publicKey: string): Promise<MultiSignatureTransaction[]>;

	/**
	 * Find a multi-signature transaction by its ID.
	 *
	 * @param {string} id
	 * @returns {Promise<MultiSignatureTransaction>}
	 * @memberof MultiSignatureService
	 */
	findById(id: string): Promise<MultiSignatureTransaction>;

	/**
	 * Broadcast the given multi-signature transaction.
	 *
	 * @param {MultiSignatureTransaction} transaction
	 * @returns {Promise<string>}
	 * @memberof MultiSignatureService
	 */
	broadcast(transaction: MultiSignatureTransaction): Promise<string>;

	/**
	 *
	 *
	 * @param {SignedTransactionData} transaction
	 * @param {boolean} [excludeFinal]
	 * @returns {boolean}
	 * @memberof MultiSignatureService
	 */
	isMultiSignatureReady(transaction: SignedTransactionData, excludeFinal?: boolean): boolean;

	/**
	 *
	 *
	 * @param {SignedTransactionData} transaction
	 * @returns {boolean}
	 * @memberof MultiSignatureService
	 */
	needsSignatures(transaction: SignedTransactionData): boolean;

	/**
	 *
	 *
	 * @param {SignedTransactionData} transaction
	 * @returns {boolean}
	 * @memberof MultiSignatureService
	 */
	needsAllSignatures(transaction: SignedTransactionData): boolean;

	/**
	 *
	 *
	 * @param {SignedTransactionData} transaction
	 * @param {string} publicKey
	 * @returns {boolean}
	 * @memberof MultiSignatureService
	 */
	needsWalletSignature(transaction: SignedTransactionData, publicKey: string): boolean;

	/**
	 *
	 *
	 * @param {SignedTransactionData} transaction
	 * @returns {boolean}
	 * @memberof MultiSignatureService
	 */
	needsFinalSignature(transaction: SignedTransactionData): boolean;

	/**
	 *
	 *
	 * @param {SignedTransactionData} transaction
	 * @returns {string[]}
	 * @memberof MultiSignatureService
	 */
	getValidMultiSignatures(transaction: SignedTransactionData): string[];

	/**
	 *
	 *
	 * @param {SignedTransactionData} transaction
	 * @returns {number}
	 * @memberof MultiSignatureService
	 */
	remainingSignatureCount(transaction: SignedTransactionData): number;
}
