import { Block, Transaction, Wallet } from "../dtos";

export interface Client {
	getBlock(id: string): Block;
	getBlocks(): Block[];

	getTransaction(id: string): Transaction;
	getTransactions(): Transaction[];

	getWallet(id: string): Wallet;
	getWallets(): Wallet[];
}
