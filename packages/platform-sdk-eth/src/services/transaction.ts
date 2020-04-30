import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Transaction } from "ethereumjs-tx";
import Web3 from "web3";

export class TransactionService implements Contracts.TransactionService {
	readonly #chain;
	readonly #connection;

	public constructor(network: string) {
		this.#chain = network;
		this.#connection = new Web3(new Web3.providers.HttpProvider(network)); // todo: network here is a peer
	}

	public async createTransfer(input: Contracts.TransferInput): Promise<Contracts.SignedTransaction> {
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
