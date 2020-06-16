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
	transactions(query: ClientTransactionsInput): Promise<CollectionResponse<TransactionDataCollection>>;

	wallet(id: string): Promise<WalletData>;
	wallets(query: ClientWalletsInput): Promise<CollectionResponse<WalletDataCollection>>;

	delegate(id: string): Promise<DelegateData>;
	delegates(query?: ClientWalletsInput): Promise<CollectionResponse<DelegateDataCollection>>;

	votes(id: string, query?: KeyValuePair): Promise<CollectionResponse<TransactionDataCollection>>;
	voters(id: string, query?: KeyValuePair): Promise<CollectionResponse<WalletDataCollection>>;

	syncing(): Promise<boolean>;

	broadcast(transactions: SignedTransaction[]): Promise<BroadcastResponse>;
}

export interface ClientPagination {
	// Offsetting
	page?: number;
	limit?: number;
	offset?: number;
	// Sorting
	orderBy?: string;
}

export interface ClientTransactionsInput extends ClientPagination {
	address?: string;
	senderId?: string;
	recipientId?: string;
}

export interface ClientWalletsInput extends ClientPagination {
	address?: string;
	publicKey?: string;
	username?: string;
}
