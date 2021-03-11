import { SignedTransactionData, TransactionDataType } from "./data";

/**
 *
 *
 * @export
 * @interface DataTransferObjectService
 */
export interface DataTransferObjectService {
	/**
	 *
	 *
	 * @returns {Promise<void>}
	 * @memberof DataTransferObjectService
	 */
	__destruct(): Promise<void>;

	/**
	 *
	 *
	 * @param {string} identifier
	 * @param {string} signedData
	 * @returns {SignedTransactionData}
	 * @memberof DataTransferObjectService
	 */
	signedTransaction(identifier: string, signedData: string): SignedTransactionData;

	/**
	 *
	 *
	 * @param {unknown} transaction
	 * @returns {TransactionDataType}
	 * @memberof DataTransferObjectService
	 */
	transaction(transaction: unknown): TransactionDataType;
}
