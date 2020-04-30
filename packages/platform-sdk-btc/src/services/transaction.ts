import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class TransactionService implements Contracts.TransactionService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<TransactionService> {
		return new TransactionService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async createTransfer(input: Contracts.TransferInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createTransfer");
	}

	public async createSecondSignature(input: Contracts.SecondSignatureInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createSecondSignature");
	}

	public async createDelegateRegistration(
		input: Contracts.DelegateRegistrationInput,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateRegistration");
	}

	public async createVote(input: Contracts.VoteInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createVote");
	}

	public async createMultiSignature(input: Contracts.MultiSignatureInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiSignature");
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
}
