import { ConfigRepository } from "../coins";
import { TransactionDataCollection } from "../collections";
import { TransactionDataType } from "../contracts";
import { SignedTransactionData } from "../dto/signed-transaction.contract";
import { TransactionData } from "../dto/transaction.contract";
import { Container } from "../ioc";
import { MetaPagination } from "./client.contract";
import { DataTransferObjectService } from "./data-transfer-object.contract";
export declare class AbstractDataTransferObjectService implements DataTransferObjectService {
	#private;
	protected readonly container: Container;
	protected readonly configRepository: ConfigRepository;
	protected readonly dataTransferObjects: Record<string, any>;
	signedTransaction(identifier: string, signedData: string, broadcastData: any): SignedTransactionData;
	transaction(transaction: unknown): TransactionDataType & TransactionData;
	transactions(transactions: unknown[], meta: MetaPagination): TransactionDataCollection;
}
