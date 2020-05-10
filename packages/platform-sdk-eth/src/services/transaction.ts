import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import { Transaction } from "ethereumjs-tx";
import Web3 from "web3";

import { IdentityService } from "./identity";

export class TransactionService implements Contracts.TransactionService {
	readonly #peer;
	readonly #chain;
	readonly #identity;

	private constructor(opts: Contracts.KeyValuePair) {
		this.#peer = opts.peer;
		this.#chain = opts.network === "live" ? "mainnet" : "ropsten";
		this.#identity = opts.identity;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<TransactionService> {
		return new TransactionService({
			...opts,
			identity: await IdentityService.construct(opts),
		});
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const address: string = await this.#identity.address(input.sign);
		const privateKey: string = input.sign.privateKey || (await this.#identity.privateKey(input.sign));

		const { nonce } = await this.get(`wallets/${address}`);

		const transaction = new Transaction(
			{
				nonce,
				gasLimit: Web3.utils.toHex(input.feeLimit),
				gasPrice: Web3.utils.toHex(input.fee),
				to: input.data.to,
				value: Web3.utils.toHex(Web3.utils.toWei(`${input.data.amount}`, "wei")),
				// input: Buffer.from(input.to.memo, "utf8"),
			},
			{ chain: this.#chain },
		);

		transaction.sign(Buffer.from(privateKey, "hex"));

		return "0x" + transaction.serialize().toString("hex");
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

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return Utils.Http.new(this.#peer).get(path, query);
	}
}
