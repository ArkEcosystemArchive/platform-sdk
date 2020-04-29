import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Transaction } from "ethereumjs-tx";
import Web3 from "web3";

export class TransactionService implements Contracts.TransactionService {
	readonly #connection;

	public constructor(network: string) {
		this.#connection = new Web3(new Web3.providers.HttpProvider(network)); // todo: network here is a peer
	}

	public async createTransfer(data: Contracts.KeyValuePair): Promise<object> {
		const transactionCount = await this.#connection.eth.getTransactionCount(data.sender);

		const transaction = new TransactionData(
			{
				nonce: this.#connection.utils.toHex(transactionCount),
				gasLimit: this.#connection.utils.toHex(data.gasLimit),
				gasPrice: this.#connection.utils.toHex(data.gasPrice),
				to: data.recipient,
				value: this.#connection.utils.toHex(this.#connection.utils.toWei(data.amount, "wei")),
				// todo: we can use this as a vendorField like ARK
				// data: Buffer.from("Hello World", "utf8"),
			},
			{ chain: "ropsten" },
		);

		transaction.sign(Buffer.from(data.privateKey, "hex"));

		return this.#connection.eth.sendSignedTransaction("0x" + transaction.serialize().toString("hex"));

		// .on("transactionHash", (txHash) => {
		// .on("receipt", (receipt) => {
		// .on("confirmation", (confirmationNumber, receipt) => {
		// .on("error:", (error) => {
	}

	public createSecondSignature(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createSecondSignature");
	}

	public createDelegateRegistration(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateRegistration");
	}

	public createVote(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createVote");
	}

	public createMultiSignature(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiSignature");
	}

	public createIpfs(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createIpfs");
	}

	public createMultiPayment(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiPayment");
	}

	public createDelegateResignation(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateResignation");
	}

	public createHtlcLock(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcLock");
	}

	public createHtlcClaim(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcClaim");
	}

	public createHtlcRefund(data: Contracts.KeyValuePair): object {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcRefund");
	}
}
