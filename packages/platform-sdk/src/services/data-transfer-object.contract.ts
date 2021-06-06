import { SignedTransactionData, TransactionDataType } from "../contracts";

export interface DataTransferObjectService {
	signedTransaction(identifier: string, signedData: string): SignedTransactionData;

	transaction(transaction: unknown): TransactionDataType;
}
