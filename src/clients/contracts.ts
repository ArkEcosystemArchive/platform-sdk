import { Block, Transaction, Wallet } from "./dtos";

export interface Client {
	getBlock(id: string): Promise<Block>;
	getBlocks(query?: HttpQuery): Promise<Block[]>;

	getTransaction(id: string): Promise<Transaction>;
	getTransactions(query?: HttpQuery): Promise<Transaction[]>;

	getWallet(id: string): Promise<Wallet>;
	getWallets(query?: HttpQuery): Promise<Wallet[]>;
}

export type HttpQuery = Record<string, any>;
