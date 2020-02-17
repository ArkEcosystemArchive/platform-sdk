import { NotImplemented } from "../../exceptions";
import { Client } from "../contracts";
import { Block, Transaction, Wallet } from "../dtos";

export class Ark implements Client {
	public getBlock(id: string): Block {
		throw new NotImplemented(this.constructor.name, "getBlock");
	}

	public getBlocks(): Block[] {
		throw new NotImplemented(this.constructor.name, "getBlocks");
	}

	public getTransaction(id: string): Transaction {
		throw new NotImplemented(this.constructor.name, "getTransaction");
	}

	public getTransactions(): Transaction[] {
		throw new NotImplemented(this.constructor.name, "getTransactions");
	}

	public getWallet(id: string): Wallet {
		throw new NotImplemented(this.constructor.name, "getWallet");
	}

	public getWallets(): Wallet[] {
		throw new NotImplemented(this.constructor.name, "getWallets");
	}
}
