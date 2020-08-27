import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

import { PendingMultiSignature } from "../dto/pending-multi-signature";

export class MultiSignatureService implements Contracts.MultiSignatureService {
	readonly #config: Coins.Config;
	readonly #http: Contracts.HttpClient;

	private constructor(config: Coins.Config) {
		this.#config = config;
		this.#http = config.get<Contracts.HttpClient>("httpClient");
	}

	public static async construct(config: Coins.Config): Promise<MultiSignatureService> {
		return new MultiSignatureService(config);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async allWithPendingState(publicKey: string): Promise<Contracts.MultiSignatureTransaction[]> {
		return this.fetchAll(publicKey, "pending");
	}

	public async allWithReadyState(publicKey: string): Promise<Contracts.MultiSignatureTransaction[]> {
		return this.fetchAll(publicKey, "ready");
	}

	public async findById(id: string): Promise<Contracts.MultiSignatureTransaction> {
		const transaction = await this.get(`transaction/${id}`);

		return this.normalizeTransaction(transaction);
	}

	public async broadcast(transaction: Contracts.MultiSignatureTransaction): Promise<string> {
		let multiSignature = transaction.multiSignature;

		if (transaction.asset && transaction.asset.multiSignature) {
			multiSignature = transaction.asset.multiSignature;
		}

		const { id } = await this.post("transaction", {
			data: transaction,
			multisigAsset: multiSignature,
		});

		return id;
	}

	public async flush(): Promise<Contracts.MultiSignatureTransaction> {
		return this.delete("transactions");
	}

	/**
	 * All of the below methods serve as helpers to identify the different states
	 * a Multi-Signature transaction can be. These need to be determined for each
	 * coin because of how different their work. Some will return static results
	 * due to the fact that certain behaviours need to be stubbed to make it work.
	 *
	 * These methods do not interact with the network.
	 */

	public isMultiSignatureReady(transaction: Contracts.SignedTransactionData, excludeFinal?: boolean): boolean {
		return new PendingMultiSignature(transaction.data()).isMultiSignatureReady(excludeFinal);
	}

	public needsSignatures(transaction: Contracts.SignedTransactionData): boolean {
		return new PendingMultiSignature(transaction.data()).needsSignatures();
	}

	public needsAllSignatures(transaction: Contracts.SignedTransactionData): boolean {
		return new PendingMultiSignature(transaction.data()).needsAllSignatures();
	}

	public needsWalletSignature(transaction: Contracts.SignedTransactionData, publicKey: string): boolean {
		return new PendingMultiSignature(transaction.data()).needsWalletSignature(publicKey);
	}

	public needsFinalSignature(transaction: Contracts.SignedTransactionData): boolean {
		return new PendingMultiSignature(transaction.data()).needsFinalSignature();
	}

	public getValidMultiSignatures(transaction: Contracts.SignedTransactionData): string[] {
		return new PendingMultiSignature(transaction.data()).getValidMultiSignatures();
	}

	public remainingSignatureCount(transaction: Contracts.SignedTransactionData): number {
		return new PendingMultiSignature(transaction.data()).remainingSignatureCount();
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.get(`${this.getPeer()}/${path}`, query);

		return response.json();
	}

	private async delete(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.delete(`${this.getPeer()}/${path}`, query);

		return response.json();
	}

	private async post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.post(`${this.getPeer()}/${path}`, body);

		return response.json();
	}

	private getPeer(): string {
		if (this.#config.has("peerMultiSignature")) {
			return this.#config.get<string>("peerMultiSignature");
		}

		return Arr.randomElement(this.#config.get<Coins.CoinNetwork>("network").hostsMultiSignature);
	}

	private normalizeTransaction(transaction): Record<string, any> {
		return {
			...transaction.data,
			...{ id: transaction.id }, // This is the real ID, computed by the MuSig Server.
			multiSignature: transaction.multisigAsset,
		};
	}

	private async fetchAll(publicKey: string, state: string): Promise<any[]> {
		const response = await this.get("transactions", {
			publicKey,
			state,
		});

		return response.map((transaction) => this.normalizeTransaction(transaction));
	}
}
