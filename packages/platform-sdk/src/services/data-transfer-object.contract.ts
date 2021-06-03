import { SignedTransactionData, TransactionDataType } from "../contracts";

export interface DataTransferObjectService {
	__destruct(): Promise<void>;

	signedTransaction(identifier: string, signedData: string): SignedTransactionData;

	transaction(transaction: unknown): TransactionDataType;
}
