import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { ClientService } from "./client";
import { IdentityService } from "./identity";

import { createSignedTransaction } from "../utils/crypto";

export class TransactionService implements Contracts.TransactionService {
	readonly #client;
	readonly #identity;
	readonly #chainId = "gaia-13007"; // todo: make this configurable, currently uses testnet

	private constructor(opts: Contracts.KeyValuePair) {
		this.#client = opts.client;
		this.#identity = opts.identity;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<TransactionService> {
		return new TransactionService({
			...opts,
			client: await ClientService.construct({ peer: opts.peer }),
			identity: await IdentityService.construct({ peer: opts.peer }),
		});
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const senderAddress: string = await this.#identity.address({ passphrase: input.sign.passphrase });
		const keyPair = await this.#identity.keyPair({ passphrase: input.sign.passphrase });

		const { account_number, sequence } = (await this.#client.wallet(senderAddress)).raw();

		return createSignedTransaction(
			{
				msgs: [
					{
						type: "cosmos-sdk/MsgSend",
						value: {
							amount: [
								{
									amount: `${input.data.amount}`,
									denom: "umuon", // todo: make this configurable
								},
							],
							from_address: senderAddress,
							to_address: input.data.to,
						},
					},
				],
				chain_id: this.#chainId, // todo: make this configurable
				fee: {
					amount: [
						{
							amount: String(5000), // todo: make this configurable or estimate it
							denom: "umuon", // todo: make this configurable
						},
					],
					gas: String(200000), // todo: make this configurable or estimate it
				},
				memo: "",
				account_number: String(account_number),
				sequence: String(sequence),
			},
			keyPair,
		);
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "secondSignature");
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateRegistration");
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "vote");
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSignature");
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
}
