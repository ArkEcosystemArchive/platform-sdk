import { Contracts } from "@arkecosystem/platform-sdk";
import { v4 as uuidv4 } from "uuid";
import { IReadWriteWallet, ITransactionService, WalletData } from "../../../contracts";
import { State } from "../../../environment/state";

import { pqueueSettled } from "../../../helpers/queue";
import { SignedTransactionData } from "./dto/signed-transaction";

type SignedTransactionDataDictionary = Record<string, Contracts.SignedTransactionData>;

export class TransactionService implements ITransactionService {
	/**
	 * The wallet that all transactions are signed with.
	 *
	 * @memberof TransactionService
	 */
	readonly #wallet: IReadWriteWallet;

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
	 * The transactions that have been signed, broadcasted and confirmed.
	 *
	 * @memberof TransactionService
	 */
	#confirmed: SignedTransactionDataDictionary = {};

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

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;

		this.restore();
	}

	/** {@inheritDoc ITransactionService.sync} */
	public async sync(): Promise<void> {
		await pqueueSettled([() => this.syncPendingMultiSignatures(), () => this.syncReadyMultiSignatures()]);
	}

	/** {@inheritDoc ITransactionService.addSignature} */
	public async addSignature(id: string, mnemonic: string): Promise<void> {
		this.assertHasValidIdentifier(id);

		const transaction = await this.#wallet.coin().multiSignature().findById(id);

		const transactionWithSignature = await this.#wallet.coin().transaction().multiSign(transaction, {
			sign: { mnemonic },
		});

		await this.#wallet.coin().multiSignature().broadcast(transactionWithSignature.data());
	}

	/** {@inheritDoc ITransactionService.signTransfer} */
	public async signTransfer(input: Contracts.TransferInput, options?: Contracts.TransactionOptions): Promise<string> {
		return this.signTransaction("transfer", input, options);
	}

	/** {@inheritDoc ITransactionService.signSecondSignature} */
	public async signSecondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("secondSignature", input, options);
	}

	/** {@inheritDoc ITransactionService.signDelegateRegistration} */
	public async signDelegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("delegateRegistration", input, options);
	}

	/** {@inheritDoc ITransactionService.signVote} */
	public async signVote(input: Contracts.VoteInput, options?: Contracts.TransactionOptions): Promise<string> {
		return this.signTransaction("vote", input, options);
	}

	/** {@inheritDoc ITransactionService.signMultiSignature} */
	public async signMultiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("multiSignature", input, options);
	}

	/** {@inheritDoc ITransactionService.signIpfs} */
	public async signIpfs(input: Contracts.IpfsInput, options?: Contracts.TransactionOptions): Promise<string> {
		return this.signTransaction("ipfs", input, options);
	}

	/** {@inheritDoc ITransactionService.signMultiPayment} */
	public async signMultiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("multiPayment", input, options);
	}

	/** {@inheritDoc ITransactionService.signDelegateResignation} */
	public async signDelegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("delegateResignation", input, options);
	}

	/** {@inheritDoc ITransactionService.signHtlcLock} */
	public async signHtlcLock(input: Contracts.HtlcLockInput, options?: Contracts.TransactionOptions): Promise<string> {
		return this.signTransaction("htlcLock", input, options);
	}

	/** {@inheritDoc ITransactionService.signHtlcClaim} */
	public async signHtlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("htlcClaim", input, options);
	}

	/** {@inheritDoc ITransactionService.signHtlcRefund} */
	public async signHtlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("htlcRefund", input, options);
	}

	/** {@inheritDoc ITransactionService.transaction} */
	public transaction(id: string): Contracts.SignedTransactionData {
		this.assertHasValidIdentifier(id);

		if (this.hasBeenConfirmed(id)) {
			return this.#confirmed[id];
		}

		if (this.hasBeenBroadcasted(id)) {
			return this.#broadcasted[id];
		}

		if (this.hasBeenSigned(id)) {
			return this.#signed[id];
		}

		if (this.isAwaitingOurSignature(id)) {
			return this.#waitingForOurSignature[id];
		}

		if (this.isAwaitingOtherSignatures(id)) {
			return this.#waitingForOtherSignatures[id];
		}

		throw new Error(`Transaction [${id}] could not be found.`);
	}

	/** {@inheritDoc ITransactionService.pending} */
	public pending(): SignedTransactionDataDictionary {
		return {
			...this.signed(),
			...this.broadcasted(),
			...this.waitingForOtherSignatures(),
			...this.waitingForOurSignature(),
		};
	}

	/** {@inheritDoc ITransactionService.signed} */
	public signed(): SignedTransactionDataDictionary {
		return this.#signed;
	}

	/** {@inheritDoc ITransactionService.broadcasted} */
	public broadcasted(): SignedTransactionDataDictionary {
		return this.#broadcasted;
	}

	/** {@inheritDoc ITransactionService.waitingForOurSignature} */
	public waitingForOurSignature(): SignedTransactionDataDictionary {
		return this.#waitingForOurSignature;
	}

	/** {@inheritDoc ITransactionService.waitingForOtherSignatures} */
	public waitingForOtherSignatures(): SignedTransactionDataDictionary {
		return this.#waitingForOtherSignatures;
	}

	/** {@inheritDoc ITransactionService.hasBeenSigned} */
	public hasBeenSigned(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#signed[id] !== undefined;
	}

	/** {@inheritDoc ITransactionService.hasBeenBroadcasted} */
	public hasBeenBroadcasted(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#broadcasted[id] !== undefined;
	}

	/** {@inheritDoc ITransactionService.hasBeenConfirmed} */
	public hasBeenConfirmed(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#confirmed[id] !== undefined;
	}

	/** {@inheritDoc ITransactionService.isAwaitingConfirmation} */
	public isAwaitingConfirmation(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#broadcasted[id] !== undefined;
	}

	/** {@inheritDoc ITransactionService.isAwaitingOurSignature} */
	public isAwaitingOurSignature(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#waitingForOurSignature[id] !== undefined;
	}

	/** {@inheritDoc ITransactionService.isAwaitingOtherSignatures} */
	public isAwaitingOtherSignatures(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#waitingForOtherSignatures[id] !== undefined;
	}

	/** {@inheritDoc ITransactionService.isAwaitingSignatureByPublicKey} */
	public isAwaitingSignatureByPublicKey(id: string, publicKey: string): boolean {
		this.assertHasValidIdentifier(id);

		let transaction: Contracts.SignedTransactionData | undefined;

		if (this.#waitingForOurSignature[id]) {
			transaction = this.#waitingForOurSignature[id];
		}

		if (this.#waitingForOtherSignatures[id]) {
			transaction = this.#waitingForOtherSignatures[id];
		}

		if (transaction === undefined) {
			throw new Error(`Transaction [${id}] is not awaiting any signatures.`);
		}

		return this.#wallet.coin().multiSignature().needsWalletSignature(transaction, publicKey);
	}

	/** {@inheritDoc ITransactionService.canBeSigned} */
	public canBeSigned(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#wallet.coin().multiSignature().needsWalletSignature(this.transaction(id), this.getPublicKey());
	}

	/** {@inheritDoc ITransactionService.canBeBroadcasted} */
	public canBeBroadcasted(id: string): boolean {
		this.assertHasValidIdentifier(id);

		return this.#signed[id] !== undefined;
	}

	/** {@inheritDoc ITransactionService.broadcast} */
	public async broadcast(id: string): Promise<Contracts.BroadcastResponse> {
		this.assertHasValidIdentifier(id);

		const transaction: Contracts.SignedTransactionData = this.transaction(id);

		let result: Contracts.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		if (this.canBeBroadcasted(id)) {
			if (State.profile().usesMultiPeerBroadcasting()) {
				result = await this.#wallet.client().broadcastSpread([transaction], this.#wallet.getRelays());
			} else {
				result = await this.#wallet.client().broadcast([transaction]);
			}
		} else if (transaction.isMultiSignature() || transaction.isMultiSignatureRegistration()) {
			result.accepted.push(await this.#wallet.coin().multiSignature().broadcast(transaction.data()));
		}

		if (result.accepted.includes(transaction.id())) {
			this.#broadcasted[id] = this.#signed[id];
		}

		return result;
	}

	/** {@inheritDoc ITransactionService.confirm} */
	public async confirm(id: string): Promise<boolean> {
		this.assertHasValidIdentifier(id);

		if (!this.isAwaitingConfirmation(id)) {
			throw new Error(`Transaction [${id}] is not awaiting confirmation.`);
		}

		try {
			const transactionLocal: Contracts.SignedTransactionData = this.transaction(id);
			const transaction: Contracts.TransactionData = await this.#wallet
				.client()
				.transaction(transactionLocal.id());

			if (transaction.isConfirmed()) {
				delete this.#signed[id];
				delete this.#broadcasted[id];
				delete this.#waitingForOtherSignatures[id];
				delete this.#waitingForOurSignature[id];

				// We store the transaction here to be able to access it after it
				// has been confirmed. This list won't be persisted which means
				// it will be gone after a reboot of the consumer application.
				this.#confirmed[id] = transactionLocal;
			}

			return transaction.isConfirmed();
		} catch {
			return false;
		}
	}


	/** {@inheritDoc ITransactionService.fromPublicKey} */
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
		dumpStorage(this.#waitingForOurSignature, WalletData.WaitingForOurSignatureTransactions);
		dumpStorage(this.#waitingForOtherSignatures, WalletData.WaitingForOtherSignaturesTransactions);
	}


	/** {@inheritDoc ITransactionService.fromPublicKey} */
	public restore(): void {
		const restoreStorage = (storage: object, storageKey: string) => {
			const transactions: object = this.#wallet.data().get(storageKey) || {};

			for (const [id, transaction] of Object.entries(transactions)) {
				this.assertHasValidIdentifier(id);

				storage[id] = this.#wallet.dataTransferObject().signedTransaction(id, transaction);
			}
		};

		restoreStorage(this.#signed, WalletData.SignedTransactions);
		restoreStorage(this.#broadcasted, WalletData.BroadcastedTransactions);
		restoreStorage(this.#waitingForOurSignature, WalletData.WaitingForOurSignatureTransactions);
		restoreStorage(this.#waitingForOtherSignatures, WalletData.WaitingForOtherSignaturesTransactions);
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

		const uuid: string = uuidv4();

		// When we are working with Multi-Signatures we need to sign them in split through
		// broadcasting and fetching them multiple times until all participants have signed
		// the transaction. Once the transaction is fully signed we can mark it as finished.
		if (transaction.isMultiSignature() || transaction.isMultiSignatureRegistration()) {
			this.#waitingForOtherSignatures[uuid] = transaction;
		} else {
			this.#signed[uuid] = transaction;
		}

		return uuid;
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
			const signedTransaction = new SignedTransactionData(
				transactionId,
				transaction,
				JSON.stringify(transaction),
			);

			this.#waitingForOurSignature[transactionId] = signedTransaction;
			this.#waitingForOtherSignatures[transactionId] = signedTransaction;

			if (!this.canBeSigned(transactionId)) {
				delete this.#waitingForOurSignature[transactionId];
			}
		}
	}

	private async syncReadyMultiSignatures(): Promise<void> {
		const transactions = await this.#wallet.coin().multiSignature().allWithReadyState(this.getPublicKey());

		for (const transaction of transactions) {
			this.#signed[transaction.id] = new SignedTransactionData(
				transaction.id,
				transaction,
				JSON.stringify(transaction),
			);
		}
	}
}
