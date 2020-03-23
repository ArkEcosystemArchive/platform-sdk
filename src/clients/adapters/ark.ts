import { Connection } from "@arkecosystem/client";

import { Client, HttpQuery } from "../contracts";
import { Block, Transaction, Wallet } from "../dtos";

export class Ark implements Client {
	private readonly connection: Connection;

	public constructor(readonly peer: string) {
		this.connection = new Connection(peer);
	}

	public async getBlock(id: string): Promise<Block> {
		const { body } = await this.connection.api("blocks").get(id);

		return new Block({ id: body.data.id, height: body.data.height });
	}

	public async getBlocks(query?: HttpQuery): Promise<Block[]> {
		const { body } = await this.connection.api("blocks").all(query);

		return body.data.map((block) => new Block({ id: block.id, height: block.height }));
	}

	public async getTransaction(id: string): Promise<Transaction> {
		const { body } = await this.connection.api("transactions").get(id);

		return new Transaction({ id: body.data.id, amount: body.data.amount });
	}

	public async getTransactions(query?: HttpQuery): Promise<Transaction[]> {
		const { body } = await this.connection.api("transactions").all(query);

		return body.data.map((block) => new Transaction({ id: block.id, amount: block.amount }));
	}

	public async getWallet(id: string): Promise<Wallet> {
		const { body } = await this.connection.api("wallets").get(id);

		return new Wallet({ address: body.data.address, publicKey: body.data.publicKey });
	}

	public async getWallets(query?: HttpQuery): Promise<Wallet[]> {
		const { body } = await this.connection.api("wallets").all(query);

		return body.data.map((block) => new Wallet({ address: block.address, publicKey: block.publicKey }));
	}
}
