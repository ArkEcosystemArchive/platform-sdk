import { Contracts, DTO } from "@arkecosystem/platform-sdk";

type SignedTransactionDataDictionary = Record<string, DTO.SignedTransactionData>;

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
	readonly #signed: SignedTransactionDataDictionary = {};
	readonly #broadcasted: SignedTransactionDataDictionary = {};

	public constructor(wallet) {
		this.#wallet = wallet;
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
		const broadcasting: DTO.SignedTransactionData[] = ids.map((id: string) => this.#signed[id]);

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
				delete this.#signed[id];
				delete this.#broadcasted[id];
			}

			return transaction.isConfirmed();
		} catch {
			return false;
		}
	}

	private async signTransaction(type: string, input: any, options?: Contracts.TransactionOptions): Promise<string> {
		const transaction: DTO.SignedTransactionData = await this.getService()[type](input, options);

		this.#signed[transaction.id()] = transaction;

		return transaction.id();
	}

	private getService(): Contracts.TransactionService {
		return this.#wallet.coin().transaction();
	}
}
