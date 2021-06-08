import { PendingMultiSignatureTransaction } from "@arkecosystem/multi-signature";
import { Coins, Contracts, Helpers, IoC, Networks, Services } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";

@IoC.injectable()
export class MultiSignatureService extends Services.AbstractMultiSignatureService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	private readonly configRepository!: Coins.ConfigRepository;

	@IoC.inject(IoC.BindingType.HttpClient)
	private readonly httpClient!: HttpClient;

	/** @inheritdoc */
	public async allWithPendingState(publicKey: string): Promise<Services.MultiSignatureTransaction[]> {
		return this.#fetchAll(publicKey, "pending");
	}

	/** @inheritdoc */
	public async allWithReadyState(publicKey: string): Promise<Services.MultiSignatureTransaction[]> {
		return this.#fetchAll(publicKey, "ready");
	}

	/** @inheritdoc */
	public async findById(id: string): Promise<Services.MultiSignatureTransaction> {
		return this.#normalizeTransaction(await this.#get(`transaction/${id}`));
	}

	/** @inheritdoc */
	public async broadcast(transaction: Services.MultiSignatureTransaction): Promise<string> {
		let multiSignature = transaction.multiSignature;

		if (transaction.asset && transaction.asset.multiSignature) {
			multiSignature = transaction.asset.multiSignature;
		}

		const { id } = await this.#post("transaction", {
			data: transaction,
			multisigAsset: multiSignature,
		});

		return id;
	}

	/** @inheritdoc */
	public async flush(): Promise<Services.MultiSignatureTransaction> {
		return this.#delete("transactions");
	}

	/** @inheritdoc */
	public isMultiSignatureReady(transaction: Contracts.SignedTransactionData, excludeFinal?: boolean): boolean {
		return new PendingMultiSignatureTransaction(transaction.data()).isMultiSignatureReady({ excludeFinal });
	}

	/** @inheritdoc */
	public needsSignatures(transaction: Contracts.SignedTransactionData): boolean {
		return new PendingMultiSignatureTransaction(transaction.data()).needsSignatures();
	}

	/** @inheritdoc */
	public needsAllSignatures(transaction: Contracts.SignedTransactionData): boolean {
		return new PendingMultiSignatureTransaction(transaction.data()).needsAllSignatures();
	}

	/** @inheritdoc */
	public needsWalletSignature(transaction: Contracts.SignedTransactionData, publicKey: string): boolean {
		return new PendingMultiSignatureTransaction(transaction.data()).needsWalletSignature(publicKey);
	}

	/** @inheritdoc */
	public needsFinalSignature(transaction: Contracts.SignedTransactionData): boolean {
		return new PendingMultiSignatureTransaction(transaction.data()).needsFinalSignature();
	}

	/** @inheritdoc */
	public getValidMultiSignatures(transaction: Contracts.SignedTransactionData): string[] {
		return new PendingMultiSignatureTransaction(transaction.data()).getValidMultiSignatures();
	}

	/** @inheritdoc */
	public remainingSignatureCount(transaction: Contracts.SignedTransactionData): number {
		return new PendingMultiSignatureTransaction(transaction.data()).remainingSignatureCount();
	}

	/**
	 *
	 *
	 * @private
	 * @param {string} path
	 * @param {Contracts.KeyValuePair} [query]
	 * @returns {Promise<Contracts.KeyValuePair>}
	 * @memberof MultiSignatureService
	 */
	async #get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return (await this.httpClient.get(`${this.#getPeer()}/${path}`, query)).json();
	}

	/**
	 *
	 *
	 * @private
	 * @param {string} path
	 * @param {Contracts.KeyValuePair} [query]
	 * @returns {Promise<Contracts.KeyValuePair>}
	 * @memberof MultiSignatureService
	 */
	async #delete(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return (await this.httpClient.delete(`${this.#getPeer()}/${path}`, query)).json();
	}

	/**
	 *
	 *
	 * @private
	 * @param {string} path
	 * @param {Contracts.KeyValuePair} body
	 * @returns {Promise<Contracts.KeyValuePair>}
	 * @memberof MultiSignatureService
	 */
	async #post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return (await this.httpClient.post(`${this.#getPeer()}/${path}`, body)).json();
	}

	/**
	 *
	 *
	 * @private
	 * @returns {string}
	 * @memberof MultiSignatureService
	 */
	#getPeer(): string {
		return Helpers.randomHost(this.configRepository.get<Networks.NetworkManifest>("network").hosts, "musig").host;
	}

	/**
	 *
	 *
	 * @private
	 * @param {*} transaction
	 * @returns {Record<string, any>}
	 * @memberof MultiSignatureService
	 */
	#normalizeTransaction({ data, id, timestamp, multisigAsset }: any): Record<string, any> {
		return {
			...data,
			id, // This is the real ID, computed by the MuSig Server.
			timestamp,
			multiSignature: multisigAsset,
		};
	}

	/**
	 *
	 *
	 * @private
	 * @param {string} publicKey
	 * @param {string} state
	 * @returns {Promise<any[]>}
	 * @memberof MultiSignatureService
	 */
	async #fetchAll(publicKey: string, state: string): Promise<any[]> {
		return (
			await this.#get("transactions", {
				publicKey,
				state,
			})
		).map(this.#normalizeTransaction);
	}
}
