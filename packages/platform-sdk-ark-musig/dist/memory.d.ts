import { Interfaces } from "@arkecosystem/crypto";
import { IStoreTransaction } from "./contracts";
declare class Memory {
	#private;
	constructor();
	saveTransaction(transaction: IStoreTransaction): string;
	updateTransaction(transaction: Interfaces.ITransactionData): void;
	getTransactionById(storeId: string): IStoreTransaction;
	getTransactionsByPublicKey(publicKey: string): IStoreTransaction[];
	getAllTransactions(): IStoreTransaction[];
	deleteAllTransactions(): void;
	loadTransactions(transactions: IStoreTransaction[]): void;
	removeById(storeId: string): void;
}
export declare const memory: Memory;
export {};
