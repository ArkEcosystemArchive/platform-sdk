import { NotImplemented } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { Client } from "../contracts/client";
import { Block, Delegate, Transaction, Wallet } from "./dto";

export class Ethereum implements Client {
	public constructor(private readonly peer: string) {}

	public async getBlock(id: string): Promise<Block> {
		throw new NotImplemented(this.constructor.name, "getBlock");
	}

	public async getBlocks(query?: KeyValuePair): Promise<Block[]> {
		throw new NotImplemented(this.constructor.name, "getBlocks");
	}

	public async searchBlocks(query: KeyValuePair): Promise<Block[]> {
		throw new NotImplemented(this.constructor.name, "searchBlocks");
	}

	public async getTransaction(id: string): Promise<Transaction> {
		throw new NotImplemented(this.constructor.name, "getTransaction");
	}

	public async getTransactions(query?: KeyValuePair): Promise<Transaction[]> {
		throw new NotImplemented(this.constructor.name, "getTransactions");
	}

	public async searchTransactions(query: KeyValuePair): Promise<Transaction[]> {
		throw new NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<Wallet> {
		throw new NotImplemented(this.constructor.name, "getWallet");
	}

	public async getWallets(query?: KeyValuePair): Promise<Wallet[]> {
		throw new NotImplemented(this.constructor.name, "getWallets");
	}

	public async searchWallets(query: KeyValuePair): Promise<Wallet[]> {
		throw new NotImplemented(this.constructor.name, "searchWallets");
	}

	public async getDelegate(id: string): Promise<Delegate> {
		throw new NotImplemented(this.constructor.name, "getDelegate");
	}

	public async getDelegates(query?: KeyValuePair): Promise<Delegate[]> {
		throw new NotImplemented(this.constructor.name, "getDelegates");
	}
}
