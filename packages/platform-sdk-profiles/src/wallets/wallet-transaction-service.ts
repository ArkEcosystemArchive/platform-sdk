import { Contracts, DTO } from "@arkecosystem/platform-sdk";

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
	readonly #signed: SignedTransactionDataDictionary = {};

	/**
	 * The transactions that have been signed and broadcasted.
	 *
	 * @memberof TransactionService
	 */
	readonly #broadcasted: SignedTransactionDataDictionary = {};

	/**
	 * The transactions that are waiting for the signatures of other participants.
	 *
	 * @memberof TransactionService
	 */
	readonly #waitingForOtherSignatures: SignedTransactionDataDictionary = {};

	/**
	 * The transactions that are waiting for the signatures of the wallet.
	 *
	 * @memberof TransactionService
	 */
	readonly #waitingForYourSignature: SignedTransactionDataDictionary = {};

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
	 * @returns {Promise<Contracts.BroadcastResponse>}
	 * @memberof TransactionService
	 */
	public async broadcast(ids: string[]): Promise<Contracts.BroadcastResponse> {
		// @TODO: handle multisignature broadcasting

		const broadcasting: Contracts.SignedTransactionData[] = ids.map((id: string) => {
			this.assertHasValidIdentifier(id);

			return this.#signed[id];
		});

		const response: Contracts.BroadcastResponse = await this.#wallet.client().broadcast(broadcasting);

		for (const transactionId of response.accepted) {
			this.#broadcasted[transactionId] = this.#signed[transactionId];
		}

		return response;
	}

	/**
	 * Get the transaction for the given ID if it is exists with any valid state.
	 *
	 * @param {string} id
	 * @returns {Contracts.SignedTransactionData}
	 * @memberof TransactionService
	 */
	public transaction(id: string): Contracts.SignedTransactionData {
		if (this.hasBeenSigned(id)) {
			return this.#signed[id];
		}

		if (this.hasBeenBroadcasted(id)) {
			return this.#broadcasted[id];
		}

		if (this.isAwaitingYourSignature(id)) {
			return this.#waitingForYourSignature[id];
		}

		if (this.isAwaitingOtherSignatures(id)) {
			return this.#waitingForOtherSignatures[id];
		}

		throw new Error(`Transaction [{$id}] could not be found.`);
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
			...this.waitingForYourSignature(),
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
	 * Get all transactions that are waiting for the signatures of other participants.
	 *
	 * @returns {SignedTransactionDataDictionary}
	 * @memberof TransactionService
	 */
	public waitingForOtherSignatures(): SignedTransactionDataDictionary {
		return this.#waitingForOtherSignatures;
	}

	/**
	 * Get all transactions that are waiting for your signature.
	 *
	 * @returns {SignedTransactionDataDictionary}
	 * @memberof TransactionService
	 */
	public waitingForYourSignature(): SignedTransactionDataDictionary {
		return this.#waitingForYourSignature;
	}

	/**
	 * Check if the given ID has been signed.
	 *
	 * @param {string} id
	 * @returns {boolean}
	 * @memberof TransactionService
	 */
	public hasBeenSigned(id: string): boolean {
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
		return !!this.#broadcasted[id];
	}

	/**
	 * Check if the given ID is waiting for your signature.
	 *
	 * @param {string} id
	 * @returns {boolean}
	 * @memberof TransactionService
	 */
	public isAwaitingYourSignature(id: string): boolean {
		return !!this.#waitingForYourSignature[id];
	}

	/**
	 * Check if the given ID is waiting for signatures of other participants.
	 *
	 * @param {string} id
	 * @returns {boolean}
	 * @memberof TransactionService
	 */
	public isAwaitingOtherSignatures(id: string): boolean {
		return !!this.#waitingForOtherSignatures[id];
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
				delete this.#waitingForYourSignature[id];
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
		dumpStorage(this.#waitingForOtherSignatures, WalletData.WaitingForOtherSignatures);
		dumpStorage(this.#waitingForYourSignature, WalletData.WaitingForYourSignature);
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
		restoreStorage(this.#waitingForOtherSignatures, WalletData.WaitingForOtherSignatures);
		restoreStorage(this.#waitingForYourSignature, WalletData.WaitingForYourSignature);
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

		this.#signed[transaction.id()] = transaction;

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
}
