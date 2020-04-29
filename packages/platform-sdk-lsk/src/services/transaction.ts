import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import * as transactions from "@liskhq/lisk-transactions";

export class TransactionService implements Contracts.TransactionService {
	readonly #network;

	public constructor(network: string) {
		this.#network = network;
	}

	public async createTransfer(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("transfer", data);
	}

	public async createSecondSignature(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("registerSecondPassphrase", data);
	}

	public async createDelegateRegistration(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("registerDelegate", data);
	}

	public async createVote(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("castVotes", data);
	}

	public async createMultiSignature(data: Contracts.KeyValuePair): Promise<Contracts.SignedTransaction> {
		return this.createFromData("registerMultisignature", data);
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

	private async createFromData(type: string, data: Contracts.KeyValuePair, callback?: Function): Promise<Contracts.SignedTransaction> {
		const struct: Contracts.KeyValuePair = { ...data };

		struct.networkIdentifier = this.#network;

		if (callback) {
			callback({ struct });
		}

		// todo: support multisignature

		if (struct.passphrase) {
			struct.passphrase = data.passphrase;
		}

		if (struct.secondPassphrase) {
			struct.secondPassphrase = data.secondPassphrase;
		}

		return transactions[type](struct);
	}
}
