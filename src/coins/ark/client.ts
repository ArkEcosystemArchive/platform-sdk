import { Connection } from "@arkecosystem/client";

import { KeyValuePair } from "../../types";
import { Client, CollectionResponse } from "../contracts/client";
import { Block, Delegate, Peer, Transaction, Wallet } from "./dto";

export class Ark implements Client {
	private readonly connection: Connection;

	public constructor(readonly peer: string) {
		this.connection = new Connection(peer);
	}

	public async getBlock(id: string): Promise<Block> {
		const { body } = await this.connection.api("blocks").get(id);

		return new Block(body.data);
	}

	public async getBlocks(query?: KeyValuePair): Promise<CollectionResponse<Block>> {
		const { body } = await this.connection.api("blocks").all(query);

		return { meta: body.meta, data: body.data.map((block) => new Block(block)) };
	}

	public async searchBlocks(query: KeyValuePair): Promise<CollectionResponse<Block>> {
		const { body } = await this.connection.api("blocks").search(query);

		return { meta: body.meta, data: body.data.map((block) => new Block(block)) };
	}

	public async getTransaction(id: string): Promise<Transaction> {
		const { body } = await this.connection.api("transactions").get(id);

		return new Transaction(body.data);
	}

	public async getTransactions(query?: KeyValuePair): Promise<CollectionResponse<Transaction>> {
		const { body } = await this.connection.api("transactions").all(query);

		return { meta: body.meta, data: body.data.map((transaction) => new Transaction(transaction)) };
	}

	public async searchTransactions(query: KeyValuePair): Promise<CollectionResponse<Transaction>> {
		const { body } = await this.connection.api("transactions").search(query);

		return { meta: body.meta, data: body.data.map((transaction) => new Transaction(transaction)) };
	}

	public async getWallet(id: string): Promise<Wallet> {
		const { body } = await this.connection.api("wallets").get(id);

		return new Wallet(body.data);
	}

	public async getWallets(query?: KeyValuePair): Promise<CollectionResponse<Wallet>> {
		const { body } = await this.connection.api("wallets").all(query);

		return { meta: body.meta, data: body.data.map((wallet) => new Wallet(wallet)) };
	}

	public async searchWallets(query: KeyValuePair): Promise<CollectionResponse<Wallet>> {
		const { body } = await this.connection.api("wallets").search(query);

		return { meta: body.meta, data: body.data.map((wallet) => new Wallet(wallet)) };
	}

	public async getDelegate(id: string): Promise<Delegate> {
		const { body } = await this.connection.api("delegates").get(id);

		return new Delegate(body.data);
	}

	public async getDelegates(query?: KeyValuePair): Promise<CollectionResponse<Delegate>> {
		const { body } = await this.connection.api("delegates").all(query);

		return { meta: body.meta, data: body.data.map((wallet) => new Delegate(wallet)) };
	}

	public async getPeers(query?: KeyValuePair): Promise<CollectionResponse<Peer>> {
		const { body } = await this.connection.api("peers").all(query);

		return { meta: body.meta, data: body.data.map((peer) => new Peer(peer)) };
	}

	// todo: normalise the response
	public async getConfiguration(): Promise<any> {
		const { body } = await this.connection.api("node").configuration();

		return body.data;
	}

	// todo: normalise the response
	public async getCryptoConfiguration(): Promise<any> {
		const { body } = await this.connection.api("node").crypto();

		return body.data;
	}

	// todo: normalise the response
	public async getFeesByNode(days: number): Promise<any> {
		const { body } = await this.connection.api("node").fees(days);

		return body.data;
	}

	// todo: normalise the response
	public async getFeesByType(): Promise<any> {
		const { body } = await this.connection.api("transactions").fees();

		return body.data;
	}

	// todo: normalise the response
	public async getSyncStatus(): Promise<any> {
		const { body } = await this.connection.api("node").syncing();

		return body.data;
	}

	// todo: normalise the response
	public async postTransactions(transactions: object[]): Promise<any> {
		const { body } = await this.connection.api("transactions").create({ transactions });

		return body.data;
	}
}
