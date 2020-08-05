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
	readonly #transactions: Record<string, Contracts.SignedTransaction> = {};

	public constructor(wallet) {
		this.#wallet = wallet;
	}

	public async signTransfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().transfer(input, options);

		return this.processTransaction(transaction);
	}

	public async signSecondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().secondSignature(input, options);

		return this.processTransaction(transaction);
	}

	public async signDelegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().delegateRegistration(input, options);

		return this.processTransaction(transaction);
	}

	public async signVote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().vote(input, options);

		return this.processTransaction(transaction);
	}

	public async signMultiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().multiSignature(input, options);

		return this.processTransaction(transaction);
	}

	public async signIpfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().ipfs(input, options);

		return this.processTransaction(transaction);
	}

	public async signMultiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().multiPayment(input, options);

		return this.processTransaction(transaction);
	}

	public async signDelegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().delegateResignation(input, options);

		return this.processTransaction(transaction);
	}

	public async signHtlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().htlcLock(input, options);

		return this.processTransaction(transaction);
	}

	public async signHtlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().htlcClaim(input, options);

		return this.processTransaction(transaction);
	}

	public async signHtlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().htlcRefund(input, options);

		return this.processTransaction(transaction);
	}

	public async signBusinessRegistration(
		input: Contracts.BusinessRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().businessRegistration(input, options);

		return this.processTransaction(transaction);
	}

	public async signBusinessResignation(
		input: Contracts.BusinessResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().businessResignation(input, options);

		return this.processTransaction(transaction);
	}

	public async signBusinessUpdate(
		input: Contracts.BusinessUpdateInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().businessUpdate(input, options);

		return this.processTransaction(transaction);
	}

	public async signBridgechainRegistration(
		input: Contracts.BridgechainRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet
			.coin()
			.bridgechainRegistration(input, options);

		return this.processTransaction(transaction);
	}

	public async signBridgechainResignation(
		input: Contracts.BridgechainResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet
			.coin()
			.bridgechainResignation(input, options);

		return this.processTransaction(transaction);
	}

	public async signBridgechainUpdate(
		input: Contracts.BridgechainUpdateInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const transaction: Contracts.SignedTransaction = await this.#wallet.coin().bridgechainUpdate(input, options);

		return this.processTransaction(transaction);
	}

	public async broadcast(transactions: Contracts.SignedTransaction[]): Promise<Contracts.BroadcastResponse> {
		return this.#wallet.client().broadcast(transactions);
	}

	private processTransaction(transaction: Contracts.SignedTransaction) {
		this.#transactions[transaction.id] = transaction;

		return transaction;
	}
}
