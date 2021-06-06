import { SignedTransactionData, TransactionDataType } from "../contracts";

export interface DataTransferObjectService {
	signedTransaction(identifier: string, signedData: any, broadcastData: any): SignedTransactionData;

	transaction(transaction: unknown): TransactionDataType;
}
