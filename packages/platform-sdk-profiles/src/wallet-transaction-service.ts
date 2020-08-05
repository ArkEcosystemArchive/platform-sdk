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

	public constructor(wallet) {
		this.#wallet = wallet;
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().transfer(input, options);
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().secondSignature(input, options);
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().delegateRegistration(input, options);
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().vote(input, options);
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().multiSignature(input, options);
	}

	public async ipfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().ipfs(input, options);
	}

	public async multiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().multiPayment(input, options);
	}

	public async delegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().delegateResignation(input, options);
	}

	public async htlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().htlcLock(input, options);
	}

	public async htlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().htlcClaim(input, options);
	}

	public async htlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().htlcRefund(input, options);
	}

	public async businessRegistration(
		input: Contracts.BusinessRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().businessRegistration(input, options);
	}

	public async businessResignation(
		input: Contracts.BusinessResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().businessResignation(input, options);
	}

	public async businessUpdate(
		input: Contracts.BusinessUpdateInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().businessUpdate(input, options);
	}

	public async bridgechainRegistration(
		input: Contracts.BridgechainRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().bridgechainRegistration(input, options);
	}

	public async bridgechainResignation(
		input: Contracts.BridgechainResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().bridgechainResignation(input, options);
	}

	public async bridgechainUpdate(
		input: Contracts.BridgechainUpdateInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.#wallet.coin().bridgechainUpdate(input, options);
	}
}
