import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import TronWeb from "tronweb";

export class TransactionService implements Contracts.TransactionService {
	readonly #connection: TronWeb;

	public constructor(network: string) {
		this.#connection = new TronWeb({
			fullHost: network, // todo: for tron we need a peer, not a network identifier
		});
	}

	public async createTransfer(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		const transaction = await this.#connection.transactionBuilder.sendTrx(data.to, data.amount, data.from, 1);

		return this.#connection.trx.sign(transaction, data.privateKey);
	}

	public async createSecondSignature(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createSecondSignature");
	}

	public async createDelegateRegistration(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateRegistration");
	}

	public async createVote(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createVote");
	}

	public async createMultiSignature(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiSignature");
	}

	public async createIpfs(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createIpfs");
	}

	public async createMultiPayment(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createMultiPayment");
	}

	public async createDelegateResignation(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createDelegateResignation");
	}

	public async createHtlcLock(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcLock");
	}

	public async createHtlcClaim(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcClaim");
	}

	public async createHtlcRefund(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createHtlcRefund");
	}
}
