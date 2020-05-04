import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { RippleAPI } from "ripple-lib";

import { IdentityService } from "./identity";

export class TransactionService implements Contracts.TransactionService {
	readonly #connection: RippleAPI;

	private constructor(connection: RippleAPI) {
		this.#connection = connection;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<TransactionService> {
		const connection = new RippleAPI({ server: opts.peer });

		await connection.connect();

		return new TransactionService(connection);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transfer(input: Contracts.TransferInput): Promise<Contracts.SignedTransaction> {
		const sender: string = await new IdentityService().address({ passphrase: input.sign.passphrase });

		const prepared = await this.#connection.preparePayment(
			sender,
			{
				source: {
					address: sender,
					maxAmount: {
						value: `${input.data.amount}`,
						currency: "XRP",
					},
				},
				destination: {
					address: input.data.to,
					amount: {
						value: `${input.data.amount}`,
						currency: "XRP",
					},
				},
			},
			{ maxLedgerVersionOffset: 5 },
		);

		const { signedTransaction } = this.#connection.sign(prepared.txJSON, input.sign.passphrase);

		return signedTransaction;
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
