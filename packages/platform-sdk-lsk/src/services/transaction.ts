import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import * as transactions from "@liskhq/lisk-transactions";

export class TransactionService implements Contracts.TransactionService {
	readonly #network;

	private constructor(network: string) {
		this.#network = network;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<TransactionService> {
		return new TransactionService(opts.network);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transfer(input: Contracts.TransferInput): Promise<Contracts.SignedTransaction> {
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

	public async secondSignature(input: Contracts.SecondSignatureInput): Promise<Contracts.SignedTransaction> {
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
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("registerDelegate", input);
	}

	public async vote(input: Contracts.VoteInput): Promise<Contracts.SignedTransaction> {
		return this.createFromData("castVotes", input);
	}

	public async multiSignature(input: Contracts.MultiSignatureInput): Promise<Contracts.SignedTransaction> {
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

	public async ipfs(input: Contracts.IpfsInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "ipfs");
	}

	public async multiPayment(input: Contracts.MultiPaymentInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiPayment");
	}

	public async delegateResignation(input: Contracts.DelegateResignationInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateResignation");
	}

	public async htlcLock(input: Contracts.HtlcLockInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcLock");
	}

	public async htlcClaim(input: Contracts.HtlcClaimInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcClaim");
	}

	public async htlcRefund(input: Contracts.HtlcRefundInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcRefund");
	}

	private async createFromData(
		type: string,
		input: Contracts.KeyValuePair,
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
