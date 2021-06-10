import { TransactionDataCollection } from "../collections";
import { SignedTransactionData, TransactionDataType } from "../contracts";
import { MetaPagination } from "./client.contract";
export interface DataTransferObjectService {
	signedTransaction(identifier: string, signedData: any, broadcastData: any): SignedTransactionData;
	transaction(transaction: unknown): TransactionDataType;
	transactions(transactions: unknown[], meta: MetaPagination): TransactionDataCollection;
}
