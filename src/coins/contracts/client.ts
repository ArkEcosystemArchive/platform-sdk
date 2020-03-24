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

export interface Client {
	getBlock(id: string): Promise<Block>;
	getBlocks(query?: KeyValuePair): Promise<Block[]>;
	searchBlocks(query: KeyValuePair): Promise<Block[]>;

	getTransaction(id: string): Promise<Transaction>;
	getTransactions(query?: KeyValuePair): Promise<Transaction[]>;
	searchTransactions(query: KeyValuePair): Promise<Transaction[]>;

	getWallet(id: string): Promise<Wallet>;
	getWallets(query?: KeyValuePair): Promise<Wallet[]>;
	searchWallets(query: KeyValuePair): Promise<Wallet[]>;
}
