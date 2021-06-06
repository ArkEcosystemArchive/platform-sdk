import { TransactionDataCollection } from "../collections";
import { SignedTransactionData, TransactionDataType } from "../contracts";
import { AbstractTransactionData } from "../dto";
import { MetaPagination } from "./client.contract";

export interface DataTransferObjectService {
	signedTransaction(identifier: string, signedData: any, broadcastData: any): SignedTransactionData;

	transaction(transaction: unknown, dtos: Record<string, any>): TransactionDataType & AbstractTransactionData;

	transactions(
		transactions: unknown[],
		meta: MetaPagination,
		classes: Record<string, any>,
		decimals?: number | string,
	): TransactionDataCollection;
}
