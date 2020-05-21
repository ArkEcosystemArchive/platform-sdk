import { DelegateDataCollection, TransactionDataCollection, WalletDataCollection } from "../../coins";
import { KeyValuePair } from "../types";
import { DelegateData, TransactionData, WalletData } from "./data";
import { SignedTransaction } from "./transaction";

export interface CollectionResponse<T> {
	meta: KeyValuePair;
	data: T;
}

export interface BroadcastResponse {
	accepted: string[];
	rejected: string[];
	errors: Record<string, string[]>;
}

export interface ClientService {
	destruct(): Promise<void>;

	transaction(id: string): Promise<TransactionData>;
	transactions(query: KeyValuePair): Promise<CollectionResponse<TransactionDataCollection>>;

	wallet(id: string): Promise<WalletData>;
	wallets(query: KeyValuePair): Promise<CollectionResponse<WalletDataCollection>>;

	delegate(id: string): Promise<DelegateData>;
	delegates(query?: KeyValuePair): Promise<CollectionResponse<DelegateDataCollection>>;

	votes(id: string): Promise<CollectionResponse<TransactionDataCollection>>;
	voters(id: string): Promise<CollectionResponse<WalletDataCollection>>;

	syncing(): Promise<boolean>;

	broadcast(transactions: SignedTransaction[]): Promise<BroadcastResponse>;
}
