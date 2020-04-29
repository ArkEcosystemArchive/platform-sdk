import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import * as transactions from "@liskhq/lisk-transactions";

export class TransactionService implements Contracts.TransactionService {
	readonly #network;

	public constructor (network: string) {
		this.#network = network;
	}

	public createTransfer(data: Contracts.KeyValuePair): object {
		return this.createFromData("transfer", data);
	}

	public createSecondSignature(data: Contracts.KeyValuePair): object {
		return this.createFromData("registerSecondPassphrase", data);
	}

	public createDelegateRegistration(data: Contracts.KeyValuePair): object {
		return this.createFromData("registerDelegate", data);
	}

	public createVote(data: Contracts.KeyValuePair): object {
		return this.createFromData("castVotes", data);
	}

	public createMultiSignature(data: Contracts.KeyValuePair): object {
		return this.createFromData("registerMultisignature", data);
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

	private createFromData(type: string, data: Contracts.KeyValuePair, callback?: Function): object {
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
