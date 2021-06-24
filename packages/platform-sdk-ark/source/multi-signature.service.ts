import { Coins, Contracts, Helpers, IoC, Networks, Services } from "@arkecosystem/platform-sdk";
import { HttpClient, RequestException } from "@arkecosystem/platform-sdk-http";

import { PendingMultiSignatureTransaction } from "./multi-signature.transaction";

@IoC.injectable()
export class MultiSignatureService extends Services.AbstractMultiSignatureService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	private readonly configRepository!: Coins.ConfigRepository;

	@IoC.inject(IoC.BindingType.HttpClient)
	private readonly httpClient!: HttpClient;

	/** @inheritdoc */
	public override async allWithPendingState(publicKey: string): Promise<Services.MultiSignatureTransaction[]> {
		return this.#fetchAll(publicKey, "pending");
	}

	/** @inheritdoc */
	public override async allWithReadyState(publicKey: string): Promise<Services.MultiSignatureTransaction[]> {
		return this.#fetchAll(publicKey, "ready");
	}

	/** @inheritdoc */
	public override async findById(id: string): Promise<Services.MultiSignatureTransaction> {
		return this.#normalizeTransaction(await this.#get(`transaction/${id}`));
	}

	/** @inheritdoc */
	public override async broadcast(
		transaction: Services.MultiSignatureTransaction,
	): Promise<Services.BroadcastResponse> {
		let multisigAsset = transaction.multiSignature;

		if (transaction.asset && transaction.asset.multiSignature) {
			multisigAsset = transaction.asset.multiSignature;
		}

		try {
			const { id } = (
				await this.httpClient.post(`${this.#getPeer()}/transaction`, {
					data: transaction,
					multisigAsset,
				})
			).json();

			return {
				accepted: [id],
				rejected: [],
				errors: {},
			};
		} catch (error) {
			if (error instanceof RequestException) {
				const message: string = (error as any).response.json().message;

				let type: string | undefined = "ERR_UNKNOWN";

				if (message === "data.signatures should NOT have fewer than 1 items") {
					type = "ERR_LESS_THAN_ONE_SIGNATURE";
				}

				if (message === "Transaction signatures are not valid") {
					type = "ERR_INVALID_SIGNATURES";
				}

				return {
					accepted: [],
					rejected: [transaction.id],
					errors: {
						[transaction.id]: message,
					},
				};
			}

			throw error;
		}
	}

	/** @inheritdoc */
	public async flush(): Promise<Services.MultiSignatureTransaction> {
		return this.#delete("transactions");
	}

	/** @inheritdoc */
	public override isMultiSignatureReady(
		transaction: Contracts.SignedTransactionData,
		excludeFinal?: boolean,
	): boolean {
		return new PendingMultiSignatureTransaction(transaction.data()).isMultiSignatureReady({ excludeFinal });
	}

	/** @inheritdoc */
	public override needsSignatures(transaction: Contracts.SignedTransactionData): boolean {
		return new PendingMultiSignatureTransaction(transaction.data()).needsSignatures();
	}

	/** @inheritdoc */
	public override needsAllSignatures(transaction: Contracts.SignedTransactionData): boolean {
		return new PendingMultiSignatureTransaction(transaction.data()).needsAllSignatures();
	}

	/** @inheritdoc */
	public override needsWalletSignature(transaction: Contracts.SignedTransactionData, publicKey: string): boolean {
		return new PendingMultiSignatureTransaction(transaction.data()).needsWalletSignature(publicKey);
	}

	/** @inheritdoc */
	public override needsFinalSignature(transaction: Contracts.SignedTransactionData): boolean {
		return new PendingMultiSignatureTransaction(transaction.data()).needsFinalSignature();
	}

	/** @inheritdoc */
	public override getValidMultiSignatures(transaction: Contracts.SignedTransactionData): string[] {
		return new PendingMultiSignatureTransaction(transaction.data()).getValidMultiSignatures();
	}

	/** @inheritdoc */
	public override remainingSignatureCount(transaction: Contracts.SignedTransactionData): number {
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
		).map((transaction) => this.#normalizeTransaction(transaction));
	}
}
