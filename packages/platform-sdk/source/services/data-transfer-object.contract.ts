import { TransactionDataCollection } from "../collections";
import { SignedTransactionData, TransactionDataType, WalletData } from "../contracts";
import { MetaPagination } from "./client.contract";

export interface DataTransferObjectService {
	signedTransaction(identifier: string, signedData: any, broadcastData: any): SignedTransactionData;

	transaction(transaction: unknown): TransactionDataType;

	transactions(transactions: unknown[], meta: MetaPagination): TransactionDataCollection;

	wallet(wallet: unknown): WalletData;
}
