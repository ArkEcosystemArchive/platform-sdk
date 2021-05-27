import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { v4 as uuidv4 } from "uuid";

import { SignedTransactionData } from "../dto";
import { createSignedTransactionData } from "../utils/crypto";
import { ClientService } from "./client";
import { IdentityService } from "./identity";

export class TransactionService implements Contracts.TransactionService {
	readonly #client;
	readonly #identity;
	readonly #networkId;

	private constructor(opts: Contracts.KeyValuePair) {
		this.#client = opts.client;
		this.#identity = opts.identity;
		this.#networkId = opts.network.meta.networkId;
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService({
			...config.all(),
			client: await ClientService.__construct(config),
			identity: await IdentityService.__construct(config),
		});
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new Error("No mnemonic provided.");
			}

			const { address: senderAddress } = await this.#identity
				.address()
				.fromMnemonic(input.signatory.signingKey());
			const keyPair = await this.#identity.keyPair().fromMnemonic(input.signatory.signingKey());

			const { account_number, sequence } = (await this.#client.wallet(senderAddress)).raw();

			const signedTransaction = createSignedTransactionData(
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
					chain_id: this.#networkId,
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

			return new SignedTransactionData(uuidv4(), signedTransaction, signedTransaction);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "secondSignature");
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateRegistration");
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "vote");
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSignature");
	}

	public async ipfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "ipfs");
	}

	public async multiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiPayment");
	}

	public async delegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateResignation");
	}

	public async htlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcLock");
	}

	public async htlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcClaim");
	}

	public async htlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcRefund");
	}

	public multiSign(
		transaction: Contracts.RawTransactionData,
		input: Contracts.TransactionInputs,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSign");
	}

	public async estimateExpiration(value?: string): Promise<string | undefined> {
		return undefined;
	}
}
