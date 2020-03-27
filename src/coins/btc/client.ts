import { NotImplemented } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { Client } from "../contracts/client";
import { Block, Delegate, Peer, Transaction, Wallet } from "./dto";

export class Bitcoin implements Client {
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

	public async getPeers(query?: KeyValuePair): Promise<Peer[]> {
		throw new NotImplemented(this.constructor.name, "getPeers");
	}

	public async getConfiguration(): Promise<any> {
		throw new NotImplemented(this.constructor.name, "getConfiguration");
	}

	public async getCryptoConfiguration(): Promise<any> {
		throw new NotImplemented(this.constructor.name, "getCryptoConfiguration");
	}

	public async getFeesByNode(days: number): Promise<any> {
		throw new NotImplemented(this.constructor.name, "getFeesByNode");
	}

	public async getFeesByType(): Promise<any> {
		throw new NotImplemented(this.constructor.name, "getFeesByType");
	}

	public async getSyncStatus(): Promise<any> {
		throw new NotImplemented(this.constructor.name, "getSyncStatus");
	}

	public async getBridgechainsByBusiness(address: string, query?: KeyValuePair): Promise<any> {
		throw new NotImplemented(this.constructor.name, "getBridgechainsByBusiness");
	}

	public async postTransactions(transactions: object[]): Promise<any> {
		throw new NotImplemented(this.constructor.name, "postTransactions");
	}
}
