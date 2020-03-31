import { KeyValuePair } from "../../types";

export interface Block {
	getId(): string;

	getHeight(): string;

	toObject(): KeyValuePair;
}

export interface Transaction {
	getId(): string;

	getAmount(): string;

	toObject(): KeyValuePair;
}

export interface Wallet {
	getAddress(): string;

	getPublicKey(): string;

	toObject(): KeyValuePair;
}

export interface Delegate {
	getAddress(): string;

	getPublicKey(): string;

	toObject(): KeyValuePair;
}

export interface Peer {
	getAddress(): string;

	getPort(): number;

	toObject(): KeyValuePair;
}

export interface CollectionResponse<T> {
	meta: KeyValuePair;
	data: T[];
}

export interface Client {
	getBlock(id: string): Promise<Block>;
	getBlocks(query?: KeyValuePair): Promise<CollectionResponse<Block>>;
	searchBlocks(query: KeyValuePair): Promise<CollectionResponse<Block>>;

	getTransaction(id: string): Promise<Transaction>;
	getTransactions(query?: KeyValuePair): Promise<CollectionResponse<Transaction>>;
	searchTransactions(query: KeyValuePair): Promise<CollectionResponse<Transaction>>;

	getWallet(id: string): Promise<Wallet>;
	getWallets(query?: KeyValuePair): Promise<CollectionResponse<Wallet>>;
	searchWallets(query: KeyValuePair): Promise<CollectionResponse<Wallet>>;

	getDelegate(id: string): Promise<Delegate>;
	getDelegates(query?: KeyValuePair): Promise<CollectionResponse<Delegate>>;

	getPeers(query?: KeyValuePair): Promise<CollectionResponse<Peer>>;

	getConfiguration(): Promise<any>;
	getCryptoConfiguration(): Promise<any>;

	getFeesByNode(days: number): Promise<any>;
	getFeesByType(): Promise<any>;

	getSyncStatus(): Promise<any>;

	getBridgechainsByBusiness(address: string, query?: KeyValuePair): Promise<any>;

	postTransactions(transactions: object[]): Promise<any>;
}
