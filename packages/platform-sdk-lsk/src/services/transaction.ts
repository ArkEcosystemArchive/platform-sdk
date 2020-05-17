import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import * as transactions from "@liskhq/lisk-transactions";

export class TransactionService implements Contracts.TransactionService {
	readonly #network;

	private constructor(network: string) {
		this.#network = network;
	}

	public static async construct(config: Coins.Config): Promise<TransactionService> {
		// todo: grab the hash from the internal manifest
		return new TransactionService("7158c297294a540bc9ac6e474529c3da38d03ece056e3fa2d98141e6ec54132d");
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("transfer", {
			...input,
			...{
				data: {
					amount: input.data.amount,
					recipientId: input.data.to,
				},
			},
		});
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("registerSecondPassphrase", {
			...input,
			...{
				data: {
					secondPassphrase: input.data.passphrase,
				},
			},
		});
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("registerDelegate", input);
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("castVotes", input);
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("registerMultisignature", {
			...input,
			...{
				data: {
					keysgroup: input.data.publicKeys,
					lifetime: input.data.lifetime,
					minimum: input.data.min,
				},
			},
		});
	}

	public async ipfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "ipfs");
	}

	public async multiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiPayment");
	}

	public async delegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateResignation");
	}

	public async htlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcLock");
	}

	public async htlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcClaim");
	}

	public async htlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcRefund");
	}

	private async createFromData(
		type: string,
		input: Contracts.KeyValuePair,
		options?: Contracts.TransactionOptions,
		callback?: Function,
	): Promise<Contracts.SignedTransaction> {
		const struct: Contracts.KeyValuePair = { ...input.data };

		struct.networkIdentifier = this.#network;

		if (callback) {
			callback({ struct });
		}

		// todo: support multisignature

		if (input.sign.passphrase) {
			struct.passphrase = input.sign.passphrase;
		}

		if (input.sign.secondPassphrase) {
			struct.secondPassphrase = input.sign.secondPassphrase;
		}

		return transactions[type](struct);
	}
}
