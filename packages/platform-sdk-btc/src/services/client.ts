import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";

import { TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #baseUrl: string;

	readonly #restUrl: string = "https://blockchain.info";

	private constructor(peer: string) {
		this.#baseUrl = peer;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<ClientService> {
		return new ClientService(opts.peer);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transaction(id: string): Promise<Contracts.TransactionData> {
		// const response = await this.post("gettransaction", { txid: id });
		const response = await this.get(`rawtx/${id}`, { format: "json" });

		return new TransactionData(response);
	}

	public async transactions(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "transactions");
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const response = await this.get(`rawaddr/${id}`);

		return new WalletData(response);
	}

	public async wallets(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wallets");
	}

	public async delegate(id: string): Promise<Contracts.DelegateData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegate");
	}

	public async delegates(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.DelegateData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegates");
	}

	public async votes(id: string): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "votes");
	}

	public async voters(id: string): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		throw new Exceptions.NotImplemented(this.constructor.name, "voters");
	}

	public async configuration(): Promise<Contracts.KeyValuePair> {
		const response = await this.post("getnetworkinfo");

		throw new Exceptions.NotImplemented(this.constructor.name, "searchBlocks");
	}

	public async feesByNode(days: number): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "feesByNode");
	}

	public async feesByType(): Promise<Contracts.KeyValuePair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "feesByType");
	}

	public async syncing(): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, "syncing");
	}

	public async broadcast(transactions: object[]): Promise<void> {
		throw new Exceptions.NotImplemented(this.constructor.name, "broadcast");
	}

	private async get(path: string, query: Contracts.KeyValuePair = {}): Promise<Contracts.KeyValuePair> {
		return Utils.getJSON(`${this.#restUrl}/${path}`, query);
	}

	private async post(method: string, params: Contracts.KeyValuePair = {}): Promise<Contracts.KeyValuePair> {
		return Utils.postJSON(this.#baseUrl, "/", {
			jsonrpc: "2.0",
			method,
			params,
		});
	}
}
