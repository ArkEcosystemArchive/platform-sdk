import { NotImplemented } from "../../exceptions";
import { Client, HttpQuery } from "../contracts/client";
import { Block, Transaction, Wallet } from "./client/dto";

export class Bitcoin implements Client {
	public constructor(private readonly peer: string) {}

	public async getBlock(id: string): Promise<Block> {
		throw new NotImplemented(this.constructor.name, "getBlock");
	}

	public async getBlocks(query?: HttpQuery): Promise<Block[]> {
		throw new NotImplemented(this.constructor.name, "getBlocks");
	}

	public async searchBlocks(query: HttpQuery): Promise<Block[]> {
		throw new NotImplemented(this.constructor.name, "searchBlocks");
	}

	public async getTransaction(id: string): Promise<Transaction> {
		throw new NotImplemented(this.constructor.name, "getTransaction");
	}

	public async getTransactions(query?: HttpQuery): Promise<Transaction[]> {
		throw new NotImplemented(this.constructor.name, "getTransactions");
	}

	public async searchTransactions(query: HttpQuery): Promise<Transaction[]> {
		throw new NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<Wallet> {
		throw new NotImplemented(this.constructor.name, "getWallet");
	}

	public async getWallets(query?: HttpQuery): Promise<Wallet[]> {
		throw new NotImplemented(this.constructor.name, "getWallets");
	}

	public async searchWallets(query: HttpQuery): Promise<Wallet[]> {
		throw new NotImplemented(this.constructor.name, "searchWallets");
	}
}
