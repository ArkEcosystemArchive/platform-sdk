import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import fetch from "node-fetch";
import { TextDecoder, TextEncoder } from "util";

import { Delegate, Peer, Transaction, Wallet } from "./dto";

export class Client implements Contracts.Client {
	readonly #baseUrl: string;

	public constructor(peer: string) {
		this.#baseUrl = peer;
	}

	// https://developers.eos.io/manuals/eosjs/latest/how-to-guides/how-to-get-transaction-information
	public async getTransaction(id: string): Promise<Transaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getTransaction");
	}

	// https://developers.eos.io/manuals/eosjs/latest/how-to-guides/how-to-get-table-information
	public async getTransactions(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Transaction>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getTransactions");
	}

	public async searchTransactions(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Transaction>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchTransactions");
	}

	// https://developers.eos.io/manuals/eosjs/latest/how-to-guides/how-to-get-account-information
	public async getWallet(id: string): Promise<Wallet> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getWallet");
	}

	public async getWallets(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Wallet>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getWallets");
	}

	public async searchWallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Wallet>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchWallets");
	}

	public async getDelegate(id: string): Promise<Delegate> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getDelegate");
	}

	public async getDelegates(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Delegate>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getDelegates");
	}

	public async getPeers(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Peer>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPeers");
	}

	public async getConfiguration(): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getConfiguration");
	}

	public async getCryptoConfiguration(): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getCryptoConfiguration");
	}

	public async getFeesByNode(days: number): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getFeesByNode");
	}

	public async getFeesByType(): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getFeesByType");
	}

	public async getSyncStatus(): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getSyncStatus");
	}

	// https://developers.eos.io/manuals/eosjs/latest/how-to-guides/how-to-transfer-an-eosio-token
	public async postTransactions(transactions: object[]): Promise<void> {
		const signatureProvider = new JsSignatureProvider(["defaultPrivateKey"]);

		const rpc = new JsonRpc(this.#baseUrl, { fetch });

		const api = new Api({
			rpc,
			signatureProvider,
			textDecoder: new TextDecoder(),
			textEncoder: new TextEncoder(),
		});

		const result = await api.transact(
			{
				actions: [
					{
						account: "eosio.token",
						name: "transfer",
						authorization: [
							{
								actor: "bdfkbzietxos",
								permission: "active",
							},
						],
						data: {
							from: "bdfkbzietxos",
							to: "zqcetsxfxzca",
							quantity: "0.0001 TNT",
							memo: "Hello World",
						},
					},
				],
			},
			{
				blocksBehind: 3,
				expireSeconds: 30,
			},
		);
		console.dir(result);

		throw new Exceptions.NotImplemented(this.constructor.name, "postTransactions");
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.getJSON(`${this.#baseUrl}/${path}`, query);
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.postJSON(this.#baseUrl, path, body);
	}
}
