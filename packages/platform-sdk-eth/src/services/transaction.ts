import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Transaction } from "ethereumjs-tx";
import Web3 from "web3";

export class TransactionService implements Contracts.TransactionService {
	readonly #chain;
	readonly #connection;

	private constructor(network: string) {
		this.#chain = network;
		this.#connection = new Web3(new Web3.providers.HttpProvider(network)); // todo: network here is a peer
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<TransactionService> {
		return new TransactionService(opts.network);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transfer(input: Contracts.TransferInput): Promise<Contracts.SignedTransaction> {
		const transactionCount = await this.#connection.eth.getTransactionCount(input.data.from);

		const transaction = new Transaction(
			{
				nonce: this.#connection.utils.toHex(transactionCount),
				gasLimit: this.#connection.utils.toHex(input.feeLimit),
				gasPrice: this.#connection.utils.toHex(input.fee),
				to: input.data.to,
				value: this.#connection.utils.toHex(this.#connection.utils.toWei(input.data.amount, "wei")),
				// todo: we can use this as a vendorField like ARK
				// input: Buffer.from("Hello World", "utf8"),
			},
			{ chain: this.#chain },
		);

		transaction.sign(Buffer.from(input.sign.passphrase, "hex"));

		return this.#connection.eth.sendSignedTransaction("0x" + transaction.serialize().toString("hex"));

		// .on("transactionHash", (txHash) => {
		// .on("receipt", (receipt) => {
		// .on("confirmation", (confirmationNumber, receipt) => {
		// .on("error:", (error) => {
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

	public async delegateResignation(
		input: Contracts.DelegateResignationInput,
	): Promise<Contracts.SignedTransaction> {
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
