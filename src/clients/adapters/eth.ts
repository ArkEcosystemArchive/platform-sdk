import { NotImplemented } from "../../exceptions";
import { Client, HttpQuery } from "../contracts";
import { Block, Transaction, Wallet } from "../dtos";

export class Ethereum implements Client {
	public constructor(private readonly peer: string) {}

	public async getBlock(id: string): Promise<Block> {
		throw new NotImplemented(this.constructor.name, "getBlock");
	}

	public async getBlocks(query?: HttpQuery): Promise<Block[]> {
		throw new NotImplemented(this.constructor.name, "getBlocks");
	}

	public async getTransaction(id: string): Promise<Transaction> {
		throw new NotImplemented(this.constructor.name, "getTransaction");
	}

	public async getTransactions(query?: HttpQuery): Promise<Transaction[]> {
		throw new NotImplemented(this.constructor.name, "getTransactions");
	}

	public async getWallet(id: string): Promise<Wallet> {
		throw new NotImplemented(this.constructor.name, "getWallet");
	}

	public async getWallets(query?: HttpQuery): Promise<Wallet[]> {
		throw new NotImplemented(this.constructor.name, "getWallets");
	}
}
