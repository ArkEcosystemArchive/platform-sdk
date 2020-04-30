import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import * as transactions from "@liskhq/lisk-transactions";

export class TransactionService implements Contracts.TransactionService {
	readonly #network;

	public constructor(network: string) {
		this.#network = network;
	}

	public async createTransfer(input: Contracts.TransferInput): Promise<Contracts.SignedTransaction> {
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

	public async createSecondSignature(input: Contracts.SecondSignatureInput): Promise<Contracts.SignedTransaction> {
		return this.createFromData("registerSecondPassphrase", {
			...input,
			...{
				data: {
					secondPassphrase: input.data.passphrase,
				},
			},
		});
	}

	public async createDelegateRegistration(
		input: Contracts.DelegateRegistrationInput,
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("registerDelegate", input);
	}

	public async createVote(input: Contracts.VoteInput): Promise<Contracts.SignedTransaction> {
		return this.createFromData("castVotes", input);
	}

	public async createMultiSignature(input: Contracts.MultiSignatureInput): Promise<Contracts.SignedTransaction> {
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

	public async createIpfs(input: Contracts.IpfsInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createIpfs");
	}

	public async createMultiPayment(input: Contracts.MultiPaymentInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiPayment");
	}

	public async createDelegateResignation(
		input: Contracts.DelegateResignationInput,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateResignation");
	}

	public async createHtlcLock(input: Contracts.HtlcLockInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcLock");
	}

	public async createHtlcClaim(input: Contracts.HtlcClaimInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcClaim");
	}

	public async createHtlcRefund(input: Contracts.HtlcRefundInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcRefund");
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
