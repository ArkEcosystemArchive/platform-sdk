import { Contracts, DTO } from "@arkecosystem/platform-sdk";

import { SignedTransactionData } from "./dto/signed-transaction";
import { ReadWriteWallet, WalletData } from "./wallet.models";

type SignedTransactionDataDictionary = Record<string, Contracts.SignedTransactionData>;

/**
 * @TODO
 *
 * We need to validate that the sender of each transaction matches
 * the wallet address and/or public key we are trying to send from.
 *
 * This is quite tricky because every coin has a different method
 * to sign transactions and compute the identifying property because
 * some use an address, others a public key and again others a WIF.
 */
export class TransactionService {
	readonly #wallet: ReadWriteWallet;
	readonly #signed: SignedTransactionDataDictionary = {};
	readonly #broadcasted: SignedTransactionDataDictionary = {};

	public constructor(wallet: ReadWriteWallet) {
		this.#wallet = wallet;

		this.restore();
	}

	public async signTransfer(input: Contracts.TransferInput, options?: Contracts.TransactionOptions): Promise<string> {
		return this.signTransaction("transfer", input, options);
	}

	public async signSecondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("secondSignature", input, options);
	}

	public async signDelegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("delegateRegistration", input, options);
	}

	public async signVote(input: Contracts.VoteInput, options?: Contracts.TransactionOptions): Promise<string> {
		return this.signTransaction("vote", input, options);
	}

	public async signMultiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("multiSignature", input, options);
	}

	public async signIpfs(input: Contracts.IpfsInput, options?: Contracts.TransactionOptions): Promise<string> {
		return this.signTransaction("ipfs", input, options);
	}

	public async signMultiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("multiPayment", input, options);
	}

	public async signDelegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("delegateResignation", input, options);
	}

	public async signHtlcLock(input: Contracts.HtlcLockInput, options?: Contracts.TransactionOptions): Promise<string> {
		return this.signTransaction("htlcLock", input, options);
	}

	public async signHtlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("htlcClaim", input, options);
	}

	public async signHtlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("htlcRefund", input, options);
	}

	public async signEntityRegistration(
		input: Contracts.EntityRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("entityRegistration", input, options);
	}

	public async signEntityResignation(
		input: Contracts.EntityResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("entityResignation", input, options);
	}

	public async signEntityUpdate(
		input: Contracts.EntityUpdateInput,
		options?: Contracts.TransactionOptions,
	): Promise<string> {
		return this.signTransaction("entityUpdate", input, options);
	}

	public transaction(id: string): Contracts.SignedTransactionData {
		if (this.hasBeenSigned(id)) {
			return this.#signed[id];
		}

		if (this.hasBeenBroadcasted(id)) {
			return this.#broadcasted[id];
		}

		throw new Error(`Transaction [{$id}] has not been signed or broadcasted.`);
	}

	public pending(): SignedTransactionDataDictionary {
		return { ...this.signed(), ...this.broadcasted() };
	}

	public signed(): SignedTransactionDataDictionary {
		return this.#signed;
	}

	public hasBeenSigned(id: string): boolean {
		return this.#signed[id] !== undefined;
	}

	public broadcasted(): SignedTransactionDataDictionary {
		return this.#broadcasted;
	}

	public hasBeenBroadcasted(id: string): boolean {
		return this.#broadcasted[id] !== undefined;
	}

	public async broadcast(ids: string[]): Promise<Contracts.BroadcastResponse> {
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

	public isAwaitingConfirmation(id: string): boolean {
		return !!this.#broadcasted[id];
	}

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
	}

	/**
	 * Restore the transactions as DTO instances.
	 *
	 * @memberof TransactionService
	 */
	public restore(): void {
		const restoreStorage = (storage: object, storageKey: string) => {
			const transactions = this.#wallet.data().get(storageKey, {});

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
	}

	private async signTransaction(type: string, input: any, options?: Contracts.TransactionOptions): Promise<string> {
		const transaction: Contracts.SignedTransactionData = await this.getService()[type](input, options);

		if (this.#signed[transaction.id()] !== undefined) {
			throw new Error(
				`A transaction with the id [${transaction.id()}] already exists. Please ensure that you increase your nonce, and if applicable, set an explicit expiration.`,
			);
		}

		this.#signed[transaction.id()] = transaction;

		return transaction.id();
	}

	private getService(): Contracts.TransactionService {
		return this.#wallet.coin().transaction();
	}

	private assertHasValidIdentifier(id: string): void {
		if (id === undefined) {
			throw new Error("Encountered a malformed ID. This looks like a bug.");
		}
	}
}
