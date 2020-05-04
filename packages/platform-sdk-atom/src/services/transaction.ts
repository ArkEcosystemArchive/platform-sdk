import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { createSignedTransaction } from "../cosmos";

export class TransactionService implements Contracts.TransactionService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<TransactionService> {
		return new TransactionService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transfer(input: Contracts.TransferInput): Promise<Contracts.SignedTransaction> {
		return createSignedTransaction(
			{ gas: 1000, gasPrices: [{ amount: "10", denom: "uatom" }], memo: `Hi from Lunie` },
			[
				{
					type: `cosmos-sdk/Send`,
					value: {
						inputs: [
							{
								address: `cosmos1qperwt9wrnkg5k9e5gzfgjppzpqhyav5j24d66`,
								coins: [{ denom: `STAKE`, amount: `1` }],
							},
						],
						outputs: [
							{
								address: `cosmos1yeckxz7tapz34kjwnjxvmxzurerquhtrmxmuxt`,
								coins: [{ denom: `STAKE`, amount: `1` }],
							},
						],
					},
				},
			],
			input.sign.passphrase,
			"test-chain",
			0,
			12,
		);
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
