import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { RippleAPI } from "ripple-lib";

import { IdentityService } from "./identity";

export class TransactionService implements Contracts.TransactionService {
	readonly #connection: RippleAPI;

	private constructor(connection: RippleAPI) {
		this.#connection = connection;
	}

	public static async new(peer: string) {
		const connection = new RippleAPI({ server: peer });

		await connection.connect();

		return new TransactionService(connection);
	}

	public async createTransfer(input: Contracts.TransferInput): Promise<Contracts.SignedTransaction> {
		const sender: string = await new IdentityService().getAddress({ passphrase: input.sign.passphrase });

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
