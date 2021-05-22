import { Coins, Contracts, Exceptions, Helpers } from "@arkecosystem/platform-sdk";
import { Account, Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { v4 as uuidv4 } from "uuid";

import { SignedTransactionData } from "../dto";
import { derivePrivateKey, derivePublicKey } from "./identity/helpers";

export class TransactionService implements Contracts.TransactionService {
	readonly #config: Coins.Config;
	readonly #client: Connection;
	readonly #slip44: number;

	public constructor(config: Coins.Config) {
		this.#config = config;
		this.#client = new Connection(this.host());
		this.#slip44 = config.get<number>("network.constants.slip44");
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService(config);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		if (input.signatory.signingKey() === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, "transfer", "sign.mnemonic");
		}

		const transaction = new Transaction();
		transaction.recentBlockhash = (await this.#client.getRecentBlockhash()).blockhash;
		transaction.feePayer = new PublicKey(input.signatory.publicKey());

		transaction.add(
			SystemProgram.transfer({
				fromPubkey: transaction.feePayer,
				toPubkey: new PublicKey(input.data.to),
				lamports: parseInt(input.data.amount),
			}),
		);

		const signedTransaction = this.sign(
			transaction,
			derivePrivateKey(input.signatory.signingKey(), 0, 0, this.#slip44),
		);

		return new SignedTransactionData(
			uuidv4(),
			{
				from: input.signatory.address(),
				to: input.data.to,
				amount: input.data.amount,
			},
			signedTransaction.toString("hex"),
		);
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

	public async multiSign(
		transaction: Contracts.RawTransactionData,
		input: Contracts.TransactionInputs,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSign");
	}

	public async estimateExpiration(value?: string): Promise<string | undefined> {
		return undefined;
	}

	private sign(transaction: Transaction, privateKey: Buffer): Buffer {
		transaction.sign(new Account(derivePublicKey(privateKey)));

		return transaction.serialize({ requireAllSignatures: false, verifySignatures: false });
	}

	private host(): string {
		return `${Helpers.randomHostFromConfig(this.#config, "full").host}/api`;
	}
}
