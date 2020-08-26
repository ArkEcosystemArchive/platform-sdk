import { Contracts, DTO } from "@arkecosystem/platform-sdk";

import { promiseAllSettledByKey } from "../helpers/promise";
import { SignedTransactionData } from "./dto/signed-transaction";
import { ReadWriteWallet, WalletData } from "./wallet.models";

type SignedTransactionDataDictionary = Record<string, Contracts.SignedTransactionData>;

export class TransactionService {
	/**
	 * The wallet that all transactions are signed with.
	 *
	 * @memberof TransactionService
	 */
	readonly #wallet: ReadWriteWallet;

	/**
	 * The transactions that have been signed but not necessarily broadcasted.
	 *
	 * @memberof TransactionService
	 */
	#signed: SignedTransactionDataDictionary = {};

	/**
	 * The transactions that have been signed and broadcasted.
	 *
	 * @memberof TransactionService
	 */
	#broadcasted: SignedTransactionDataDictionary = {};

	/**
	 * The transactions that are waiting for the signatures of the wallet.
	 *
	 * @memberof TransactionService
	 */
	#waitingForOurSignature: SignedTransactionDataDictionary = {};

	/**
	 * The transactions that are waiting for the signatures of other participants.
	 *
	 * @memberof TransactionService
	 */
	#waitingForOtherSignatures: SignedTransactionDataDictionary = {};

	/**
	 * Creates an instance of TransactionService.
	 *
	 * @param {ReadWriteWallet} wallet
	 * @memberof TransactionService
	 */
	public constructor(wallet: ReadWriteWallet) {
		this.#wallet = wallet;

		this.restore();
	}

	/**
	 * Sign a Transfer transaction.
	 *
	 * @param {Contracts.TransferInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async sync(): Promise<void> {
		await Promise.allSettled([this.syncPendingMultiSignatures(), this.syncReadyMultiSignatures()]);
	}

	/**
	 * Sign the transaction for the given ID with the given mnemonic.
	 *
	 * @param {string} id
	 * @param {string} mnemonic
	 * @returns {Promise<void>}
	 * @memberof TransactionService
	 */
	public async addSignature(id: string, mnemonic: string): Promise<void> {
		this.assertHasValidIdentifier(id);

		const transaction = await this.#wallet.coin().multiSignature().findById(id);

		const transactionWithSignature = await this.#wallet.coin().transaction().multiSign(transaction, {
			sign: { mnemonic },
		});

		await this.#wallet.coin().multiSignature().broadcast(transactionWithSignature.data());
	}

	/**
	 * Sign a Transfer transaction.
	 *
	 * @param {Contracts.TransferInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async signTransfer(input: Contracts.TransferInput, options?: Contracts.TransactionOptions): Promise<string> {
		return this.signTransaction("transfer", input, options);
	}

	/**
	 * Sign a Second-Signature Registration transaction.
	 *
	 * @param {Contracts.SecondSignatureInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async signSecondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("secondSignature", input, options);
	}

	/**
	 * Sign a Delegate Registration transaction.
	 *
	 * @param {Contracts.DelegateRegistrationInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async signDelegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("delegateRegistration", input, options);
	}

	/**
	 * Sign a Vote transaction.
	 *
	 * @param {Contracts.VoteInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async signVote(input: Contracts.VoteInput, options?: Contracts.TransactionOptions): Promise<string> {
		return this.signTransaction("vote", input, options);
	}

	/**
	 * Sign a Multi-Signature Registration transaction.
	 *
	 * @param {Contracts.MultiSignatureInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async signMultiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("multiSignature", input, options);
	}

	/**
	 * Sign an IPFS transaction.
	 *
	 * @param {Contracts.IpfsInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async signIpfs(input: Contracts.IpfsInput, options?: Contracts.TransactionOptions): Promise<string> {
		return this.signTransaction("ipfs", input, options);
	}

	/**
	 * Sign a Multi-Payment transaction.
	 *
	 * @param {Contracts.MultiPaymentInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async signMultiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("multiPayment", input, options);
	}

	/**
	 * Sign a Delegate Resignation transaction.
	 *
	 * @param {Contracts.DelegateResignationInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async signDelegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("delegateResignation", input, options);
	}

	/**
	 * Sign a HTLC Lock transaction.
	 *
	 * @param {Contracts.HtlcLockInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async signHtlcLock(input: Contracts.HtlcLockInput, options?: Contracts.TransactionOptions): Promise<string> {
		return this.signTransaction("htlcLock", input, options);
	}

	/**
	 * Sign a HTLC Claim transaction.
	 *
	 * @param {Contracts.HtlcClaimInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async signHtlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("htlcClaim", input, options);
	}

	/**
	 * Sign a HTLC Refund transaction.
	 *
	 * @param {Contracts.HtlcRefundInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async signHtlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("htlcRefund", input, options);
	}

	/**
	 * Sign an entity registration transaction.
	 *
	 * @param {Contracts.EntityRegistrationInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async signEntityRegistration(
		input: Contracts.EntityRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("entityRegistration", input, options);
	}

	/**
	 * Sign an entity resignation transaction.
	 *
	 * @param {Contracts.EntityResignationInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async signEntityResignation(
		input: Contracts.EntityResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("entityResignation", input, options);
	}

	/**
	 * Sign an entity update transaction.
	 *
	 * @param {Contracts.EntityUpdateInput} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	public async signEntityUpdate(
		input: Contracts.EntityUpdateInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("entityUpdate", input, options);
	}

	/**
	 * Broadcast the given IDs.
	 *
	 * @param {string[]} ids
	 * @returns {Promise<void>}
	 * @memberof TransactionService
	 */
	public async broadcast(ids: string[]): Promise<void> {
		const broadcastRequests: Record<string, Promise<Contracts.BroadcastResponse | string>> = {};

		for (const id of ids) {
			this.assertHasValidIdentifier(id);

			const transaction: Contracts.SignedTransactionData = this.transaction(id);

			// If the transaction is ready to be broadcasted we will include it.
			if (this.canBeBroadcasted(transaction.id())) {
				broadcastRequests[id] = this.#wallet.client().broadcast([transaction.data()]);

				continue;
			}

			// If the transactions is not ready to be broadcasted to the network we will have to
			// broadcast it to the Multi-Signature Server of the respective coin and network.
			if (transaction.isMultiSignature() || transaction.isMultiSignatureRegistration()) {
				broadcastRequests[id] = this.#wallet.coin().multiSignature().broadcast(transaction.data());
			}
		}

		const responses = await promiseAllSettledByKey(broadcastRequests);

		// TODO: better error handling and reporting
		for (const [id, request] of Object.entries(responses || {})) {
			if (request.status === "rejected" || request.value instanceof Error) {
				continue;
			}

			if (typeof request.value === "string") {
				this.#broadcasted[id] = this.#signed[id];
			} else {
				// @ts-ignore
				for (const transactionId of request.value.accepted) {
					this.#broadcasted[transactionId] = this.#signed[transactionId];
				}
			}
		}
	}

	/**
	 * Get the transaction for the given ID if it is exists with any valid state.
	 *
	 * @param {string} id
	 * @returns {Contracts.SignedTransactionData}
	 * @memberof TransactionService
	 */
	public transaction(id: string): Contracts.SignedTransactionData {
		this.assertHasValidIdentifier(id);

		if (this.hasBeenSigned(id)) {
			return this.#signed[id];
		}

		if (this.hasBeenBroadcasted(id)) {
			return this.#broadcasted[id];
		}

		if (this.isAwaitingOurSignature(id)) {
			return this.#waitingForOurSignature[id];
		}

		if (this.isAwaitingOtherSignatures(id)) {
			return this.#waitingForOtherSignatures[id];
		}

		throw new Error(`Transaction [${id}] could not be found.`);
	}

	/**
	 * Get all transactions that are pending in some state.
	 *
	 * @returns {SignedTransactionDataDictionary}
	 * @memberof TransactionService
	 */
	public pending(): SignedTransactionDataDictionary {
		return {
			...this.signed(),
			...this.broadcasted(),
			...this.waitingForOtherSignatures(),
			...this.waitingForOurSignature(),
		};
	}

	/**
	 * Get all transactions that have been signed.
	 *
	 * @returns {SignedTransactionDataDictionary}
	 * @memberof TransactionService
	 */
	public signed(): SignedTransactionDataDictionary {
		return this.#signed;
	}

	/**
	 * Get all transactions that have been broadcasted.
	 *
	 * @returns {SignedTransactionDataDictionary}
	 * @memberof TransactionService
	 */
	public broadcasted(): SignedTransactionDataDictionary {
		return this.#broadcasted;
	}

	/**
	 * Get all transactions that are waiting for your signature.
	 *
	 * @returns {SignedTransactionDataDictionary}
	 * @memberof TransactionService
	 */
	public waitingForOurSignature(): SignedTransactionDataDictionary {
		return this.#waitingForOurSignature;
	}

	/**
	 * Get all transactions that are waiting for the signatures of other participants.
	 *
	 * @returns {SignedTransactionDataDictionary}
	 * @memberof TransactionService
	 */
	public waitingForOtherSignatures(): SignedTransactionDataDictionary {
		return this.#waitingForOtherSignatures;
	}

	/**
	 * Check if the given ID has been signed.
	 *
	 * @param {string} id
	 * @returns {boolean}
	 * @memberof TransactionService
	 */
	public hasBeenSigned(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#signed[id] !== undefined;
	}

	/**
	 * Check if the given ID has been broadcasted.
	 *
	 * @param {string} id
	 * @returns {boolean}
	 * @memberof TransactionService
	 */
	public hasBeenBroadcasted(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#broadcasted[id] !== undefined;
	}

	/**
	 * Check if the given ID is waiting to be confirmed.
	 *
	 * @param {string} id
	 * @returns {boolean}
	 * @memberof TransactionService
	 */
	public isAwaitingConfirmation(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#broadcasted[id] !== undefined;
	}

	/**
	 * Check if the given ID is waiting for your signature.
	 *
	 * @param {string} id
	 * @returns {boolean}
	 * @memberof TransactionService
	 */
	public isAwaitingOurSignature(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#waitingForOurSignature[id] !== undefined;
	}

	/**
	 * Check if the given ID is waiting for signatures of other participants.
	 *
	 * @param {string} id
	 * @returns {boolean}
	 * @memberof TransactionService
	 */
	public isAwaitingOtherSignatures(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#waitingForOtherSignatures[id] !== undefined;
	}

	/**
	 * Check if the given transaction for the given ID can be signed.
	 *
	 * This only affects Multi-Signature (Registration) transactions!
	 *
	 * @param {string} id
	 * @returns {boolean}
	 * @memberof TransactionService
	 */
	public canBeSigned(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#wallet.coin().multiSignature().needsWalletSignature(this.transaction(id), this.getPublicKey());
	}

	/**
	 * Check if the given transaction for the given ID can be broadcasted.
	 *
	 * This only affects Multi-Signature (Registration) transactions!
	 *
	 * @param {string} id
	 * @returns {boolean}
	 * @memberof TransactionService
	 */
	public canBeBroadcasted(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#signed[id] !== undefined;
	}

	/**
	 * Check if the given ID has been confirmed by the respective network.
	 *
	 * @param {string} id
	 * @returns {Promise<boolean>}
	 * @memberof TransactionService
	 */
	public async confirm(id: string): Promise<boolean> {
		this.assertHasValidIdentifier(id);

		if (!this.isAwaitingConfirmation(id)) {
			throw new Error(`Transaction [${id}] is not awaiting confirmation.`);
		}

		try {
			const transaction: Contracts.TransactionData = await this.#wallet.client().transaction(id);

			if (transaction.isConfirmed()) {
				delete this.#signed[id];
				delete this.#broadcasted[id];
				delete this.#waitingForOtherSignatures[id];
				delete this.#waitingForOurSignature[id];
			}

			return transaction.isConfirmed();
		} catch {
			return false;
		}
	}

	/**
	 * Dump the transactions as JSON strings.
	 *
	 * @memberof TransactionService
	 */
	public dump(): void {
		const dumpStorage = (storage: object, storageKey: string) => {
			const result: Record<string, object> = {};

			for (const [id, transaction] of Object.entries(storage)) {
				this.assertHasValidIdentifier(id);

				result[id] = transaction;
			}

			this.#wallet.data().set(storageKey, result);
		};

		dumpStorage(this.#signed, WalletData.SignedTransactions);
		dumpStorage(this.#broadcasted, WalletData.BroadcastedTransactions);
		dumpStorage(this.#waitingForOurSignature, WalletData.WaitingForOurSignature);
		dumpStorage(this.#waitingForOtherSignatures, WalletData.WaitingForOtherSignatures);
	}

	/**
	 * Restore the transactions as DTO instances.
	 *
	 * @memberof TransactionService
	 */
	public restore(): void {
		const restoreStorage = (storage: object, storageKey: string) => {
			const transactions: object | undefined = this.#wallet.data().get(storageKey, {});

			if (!transactions) {
				return;
			}

			for (const [id, transaction] of Object.entries(transactions)) {
				this.assertHasValidIdentifier(id);

				/**
				 * @TODO
				 *
				 * Implement a SignedTransactionFactory which will allow us to restore
				 * the transactions into their original coin-specific format.
				 *
				 * Not super urgent because the way it is consumed it's not an issue yet.
				 */
				storage[id] = new SignedTransactionData(id, transaction);
			}
		};

		restoreStorage(this.#signed, WalletData.SignedTransactions);
		restoreStorage(this.#broadcasted, WalletData.BroadcastedTransactions);
		restoreStorage(this.#waitingForOurSignature, WalletData.WaitingForOurSignature);
		restoreStorage(this.#waitingForOtherSignatures, WalletData.WaitingForOtherSignatures);
	}

	/**
	 * Sign a transaction of the given type.
	 *
	 * @private
	 * @param {string} type
	 * @param {*} input
	 * @param {Contracts.TransactionOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	private async signTransaction(type: string, input: any, options?: Contracts.TransactionOptions): Promise<string> {
		const transaction: Contracts.SignedTransactionData = await this.#wallet
			.coin()
			.transaction()
			[type](input, options);

		if (this.#signed[transaction.id()] !== undefined) {
			throw new Error(
				`A transaction with the id [${transaction.id()}] already exists. Please ensure that you increase your nonce, and if applicable, set an explicit expiration.`,
			);
		}

		// When we are working with Multi-Signatures we need to sign them in split through
		// broadcasting and fetching them multiple times until all participants have signed
		// the transaction. Once the transaction is fully signed we can mark it as finished.
		if (transaction.isMultiSignature() || transaction.isMultiSignatureRegistration()) {
			this.#waitingForOtherSignatures[transaction.id()] = transaction;
		} else {
			this.#signed[transaction.id()] = transaction;
		}

		return transaction.id();
	}

	/**
	 * Ensure that the given ID is defined to avoid faulty data access.
	 *
	 * @private
	 * @param {string} id
	 * @memberof TransactionService
	 */
	private assertHasValidIdentifier(id: string): void {
		if (id === undefined) {
			throw new Error("Encountered a malformed ID. This looks like a bug.");
		}
	}

	/**
	 * Get the public key of the current wallet.
	 *
	 * @private
	 * @param {string} id
	 * @memberof TransactionService
	 */
	private getPublicKey(): string {
		const publicKey: string | undefined = this.#wallet.publicKey();

		if (publicKey === undefined) {
			throw new Error(
				"This wallet is lacking a public key. Please sync the wallet before interacting with transactions.",
			);
		}

		return publicKey;
	}

	private async syncPendingMultiSignatures(): Promise<void> {
		const transactions = await this.#wallet.coin().multiSignature().allWithPendingState(this.getPublicKey());

		this.#waitingForOurSignature = {};
		this.#waitingForOtherSignatures = {};

		for (const transaction of transactions) {
			const transactionId: string = transaction.id;
			const signedTransaction = new SignedTransactionData(transaction.id, transaction);

			this.#waitingForOurSignature[transactionId] = signedTransaction;
			this.#waitingForOtherSignatures[transactionId] = signedTransaction;

			if (this.canBeSigned(transactionId)) {
				delete this.#waitingForOtherSignatures[transactionId];
			} else {
				delete this.#waitingForOurSignature[transactionId];
			}
		}
	}

	private async syncReadyMultiSignatures(): Promise<void> {
		const transactions = await this.#wallet.coin().multiSignature().allWithReadyState(this.getPublicKey());

		for (const transaction of transactions) {
			this.#signed[transaction.id] = new SignedTransactionData(transaction.id, transaction);
		}
	}
}
