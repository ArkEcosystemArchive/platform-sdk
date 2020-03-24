export interface Block {
	getId(): string;

	getHeight(): string;

	toObject(): Dictionary;
}

export interface Transaction {
	getId(): string;

	getAmount(): string;

	toObject(): Dictionary;
}

export interface Wallet {
	getAddress(): string;

	getPublicKey(): string;

	toObject(): Dictionary;
}

export interface Client {
	getBlock(id: string): Promise<Block>;
	getBlocks(query?: HttpQuery): Promise<Block[]>;
	searchBlocks(query: HttpQuery): Promise<Block[]>;

	getTransaction(id: string): Promise<Transaction>;
	getTransactions(query?: HttpQuery): Promise<Transaction[]>;
	searchTransactions(query: HttpQuery): Promise<Transaction[]>;

	getWallet(id: string): Promise<Wallet>;
	getWallets(query?: HttpQuery): Promise<Wallet[]>;
	searchWallets(query: HttpQuery): Promise<Wallet[]>;
}

export type HttpQuery = Record<string, any>;

export type Dictionary = Record<string, any>;
