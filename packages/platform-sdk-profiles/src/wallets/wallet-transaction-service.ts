import { Contracts } from "@arkecosystem/platform-sdk";

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
	readonly #wallet;
	readonly #signed: Record<string, Contracts.SignedTransaction> = {};
	readonly #broadcasted: Record<string, Contracts.SignedTransaction> = {};

	public constructor(wallet) {
		this.#wallet = wallet;
	}

	public async signTransfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().transfer(input, options);

		return this.markAsSigned(transaction);
	}

	public async signSecondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().secondSignature(input, options);

		return this.markAsSigned(transaction);
	}

	public async signDelegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().delegateRegistration(input, options);

		return this.markAsSigned(transaction);
	}

	public async signVote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().vote(input, options);

		return this.markAsSigned(transaction);
	}

	public async signMultiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().multiSignature(input, options);

		return this.markAsSigned(transaction);
	}

	public async signIpfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().ipfs(input, options);

		return this.markAsSigned(transaction);
	}

	public async signMultiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().multiPayment(input, options);

		return this.markAsSigned(transaction);
	}

	public async signDelegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().delegateResignation(input, options);

		return this.markAsSigned(transaction);
	}

	public async signHtlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().htlcLock(input, options);

		return this.markAsSigned(transaction);
	}

	public async signHtlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().htlcClaim(input, options);

		return this.markAsSigned(transaction);
	}

	public async signHtlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().htlcRefund(input, options);

		return this.markAsSigned(transaction);
	}

	public async signBusinessRegistration(
		input: Contracts.BusinessRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().businessRegistration(input, options);

		return this.markAsSigned(transaction);
	}

	public async signBusinessResignation(
		input: Contracts.BusinessResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().businessResignation(input, options);

		return this.markAsSigned(transaction);
	}

	public async signBusinessUpdate(
		input: Contracts.BusinessUpdateInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().businessUpdate(input, options);

		return this.markAsSigned(transaction);
	}

	public async signBridgechainRegistration(
		input: Contracts.BridgechainRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet
			.coin()
			.bridgechainRegistration(input, options);

		return this.markAsSigned(transaction);
	}

	public async signBridgechainResignation(
		input: Contracts.BridgechainResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet
			.coin()
			.bridgechainResignation(input, options);

		return this.markAsSigned(transaction);
	}

	public async signBridgechainUpdate(
		input: Contracts.BridgechainUpdateInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.getService().bridgechainUpdate(input, options);

		return this.markAsSigned(transaction);
	}

	public async broadcast(ids: string[]): Promise<Contracts.BroadcastResponse> {
		const broadcasting: Contracts.SignedTransaction = ids.map((id: string) => this.#signed[id]);

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
		if (!this.isAwaitingConfirmation(id)) {
			throw new Error(`Transaction [${id}] is not awaiting confirmation.`);
		}

		try {
			const transaction: Contracts.TransactionData = await this.#wallet.client().transaction(id);

			if (transaction.isConfirmed()) {
				delete this.#broadcasted[id];
			}

			return transaction.isConfirmed();
		} catch {
			return false;
		}
	}

	private markAsSigned(transaction: Contracts.SignedTransaction) {
		this.#signed[transaction.id] = transaction;

		return transaction;
	}

	private getService(): Contracts.TransactionService {
		return this.#wallet.coin().transaction();
	}
}
