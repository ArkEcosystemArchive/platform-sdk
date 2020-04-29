import { BigNumber } from "@arkecosystem/utils";

import {
	TransactionData, WalletData, DelegateData
} from "./data"
import { KeyValuePair } from "../types";

export interface CollectionResponse<T> {
	meta: KeyValuePair;
	data: T[];
}

export interface ClientService {
	getTransaction(id: string): Promise<TransactionData>;
	getTransactions(query?: KeyValuePair): Promise<CollectionResponse<TransactionData>>;
	searchTransactions(query: KeyValuePair): Promise<CollectionResponse<TransactionData>>;

	getWallet(id: string): Promise<WalletData>;
	getWallets(query?: KeyValuePair): Promise<CollectionResponse<WalletData>>;
	searchWallets(query: KeyValuePair): Promise<CollectionResponse<WalletData>>;

	getDelegate(id: string): Promise<DelegateData>;
	getDelegates(query?: KeyValuePair): Promise<CollectionResponse<DelegateData>>;

	getConfiguration(): Promise<KeyValuePair>;
	getCryptoConfiguration(): Promise<KeyValuePair>;

	getFeesByNode(days: number): Promise<KeyValuePair>;
	getFeesByType(): Promise<KeyValuePair>;

	getSyncStatus(): Promise<boolean>;

	postTransactions(transactions: object[]): Promise<void>;
}
