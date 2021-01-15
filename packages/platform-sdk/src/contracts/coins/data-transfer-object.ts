import { SignedTransactionData, TransactionDataType } from "./data";

export interface DataTransferObjectService {
	destruct(): Promise<void>;

	signedTransaction(identifier: string, signedData: string): SignedTransactionData;

	transaction(transaction: unknown): TransactionDataType;
}
