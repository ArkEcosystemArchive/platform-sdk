import { BigNumber } from "@arkecosystem/utils";

import { KeyValuePair } from "../types";
import { DelegateData, TransactionData, WalletData } from "./data";

export interface CollectionResponse<T> {
	meta: KeyValuePair;
	data: T[];
}

export interface ClientService {
	getTransaction(id: string): Promise<Contracts.TransactionData>;
	getTransactions(query?: KeyValuePair): Promise<CollectionResponse<Contracts.TransactionData>>;
	searchTransactions(query: KeyValuePair): Promise<CollectionResponse<Contracts.TransactionData>>;

	getWallet(id: string): Promise<Contracts.WalletData>;
	getWallets(query?: KeyValuePair): Promise<CollectionResponse<Contracts.WalletData>>;
	searchWallets(query: KeyValuePair): Promise<CollectionResponse<Contracts.WalletData>>;

	getDelegate(id: string): Promise<Contracts.DelegateData>;
	getDelegates(query?: KeyValuePair): Promise<CollectionResponse<Contracts.DelegateData>>;

	getConfiguration(): Promise<KeyValuePair>;
	getCryptoConfiguration(): Promise<KeyValuePair>;

	getFeesByNode(days: number): Promise<KeyValuePair>;
	getFeesByType(): Promise<KeyValuePair>;

	getSyncStatus(): Promise<boolean>;

	postTransactions(transactions: object[]): Promise<void>;
}
