import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import TronWeb from "tronweb";

export class TransactionService implements Contracts.TransactionService {
	readonly #connection: TronWeb;

	private constructor(peer: string) {
		this.#connection = new TronWeb({
			fullHost: peer,
		});
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<TransactionService> {
		return new TransactionService(opts.peer);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transfer(input: Contracts.TransferInput): Promise<Contracts.SignedTransaction> {
		const transaction = await this.#connection.transactionBuilder.sendTrx(
			input.data.to,
			input.data.amount,
			input.data.from,
			1,
		);

		return this.#connection.trx.sign(transaction, input.sign.passphrase);
	}

	public async secondSignature(input: Contracts.SecondSignatureInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "secondSignature");
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateRegistration");
	}

	public async vote(input: Contracts.VoteInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "vote");
	}

	public async multiSignature(input: Contracts.MultiSignatureInput): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSignature");
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
}
