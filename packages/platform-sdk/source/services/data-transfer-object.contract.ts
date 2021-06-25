import { ConfirmedTransactionDataCollection } from "../collections";
import { SignedTransactionData, WalletData } from "../contracts";
import { ConfirmedTransactionData } from "../dto/confirmed-transaction.contract";
import { MetaPagination } from "./client.contract";

export interface DataTransferObjectService {
	signedTransaction(identifier: string, signedData: any, broadcastData: any): SignedTransactionData;

	transaction(transaction: unknown): ConfirmedTransactionData;

	transactions(transactions: unknown[], meta: MetaPagination): ConfirmedTransactionDataCollection;

	wallet(wallet: unknown): WalletData;
}
