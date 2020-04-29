import { Connection } from "@arkecosystem/client";
import { Contracts } from "@arkecosystem/platform-sdk";

import { Delegate, Peer, Transaction, Wallet } from "./dto";

export class Client implements Contracts.Client {
	private readonly connection: Connection;

	public constructor (readonly peer: string) {
		this.connection = new Connection(peer);
	}

	public async getTransaction(id: string): Promise<Transaction> {
		const { body } = await this.connection.api("transactions").get(id);

		return new Transaction(body.data);
	}

	public async getTransactions(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Transaction>> {
		const { body } = await this.connection.api("transactions").all(query);

		return { meta: body.meta, data: body.data.map((transaction) => new Transaction(transaction)) };
	}

	public async searchTransactions(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Transaction>> {
		const { body } = await this.connection.api("transactions").search(query);

		return { meta: body.meta, data: body.data.map((transaction) => new Transaction(transaction)) };
	}

	public async getWallet(id: string): Promise<Wallet> {
		const { body } = await this.connection.api("wallets").get(id);

		return new Wallet(body.data);
	}

	public async getWallets(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Wallet>> {
		const { body } = await this.connection.api("wallets").all(query);

		return { meta: body.meta, data: body.data.map((wallet) => new Wallet(wallet)) };
	}

	public async searchWallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Wallet>> {
		const { body } = await this.connection.api("wallets").search(query);

		return { meta: body.meta, data: body.data.map((wallet) => new Wallet(wallet)) };
	}

	public async getDelegate(id: string): Promise<Delegate> {
		const { body } = await this.connection.api("delegates").get(id);

		return new Delegate(body.data);
	}

	public async getDelegates(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Delegate>> {
		const { body } = await this.connection.api("delegates").all(query);

		return { meta: body.meta, data: body.data.map((wallet) => new Delegate(wallet)) };
	}

	public async getConfiguration(): Promise<Contracts.KeyValuePair> {
		const { body } = await this.connection.api("node").configuration();

		return body.data;
	}

	// todo: normalise the response
	public async getCryptoConfiguration(): Promise<Contracts.KeyValuePair> {
		const { body } = await this.connection.api("node").crypto();

		return body.data;
	}

	// todo: normalise the response
	public async getFeesByNode(days: number): Promise<Contracts.KeyValuePair> {
		const { body } = await this.connection.api("node").fees(days);

		return body.data;
	}

	// todo: normalise the response
	public async getFeesByType(): Promise<Contracts.KeyValuePair> {
		const { body } = await this.connection.api("transactions").fees();

		return body.data;
	}

	public async getSyncStatus(): Promise<boolean> {
		const { body } = await this.connection.api("node").syncing();

		return body.data.syncing;
	}

	// todo: normalise the response
	public async postTransactions(transactions: object[]): Promise<void> {
		await this.connection.api("transactions").create({ transactions });
	}
}
