import * as transactions from "@liskhq/lisk-transactions";

import { NotImplemented } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { Crypto } from "../contracts/crypto";

export class Lisk implements Crypto {
	readonly #network;

	public constructor(network: string) {
		this.#network = network;
	}

	public createTransfer(data: KeyValuePair): object {
		return this.createFromData("transfer", data);
	}

	public createSecondSignature(data: KeyValuePair): object {
		return this.createFromData("registerSecondPassphrase", data);
	}

	public createDelegateRegistration(data: KeyValuePair): object {
		return this.createFromData("registerDelegate", data);
	}

	public createVote(data: KeyValuePair): object {
		return this.createFromData("castVotes", data);
	}

	public createMultiSignature(data: KeyValuePair): object {
		return this.createFromData("registerMultisignature", data);
	}

	public createIpfs(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createIpfs");
	}

	public createMultiPayment(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createMultiPayment");
	}

	public createDelegateResignation(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createDelegateResignation");
	}

	public createHtlcLock(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createHtlcLock");
	}

	public createHtlcClaim(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createHtlcClaim");
	}

	public createHtlcRefund(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createHtlcRefund");
	}

	private createFromData(type: string, data: KeyValuePair, callback?: Function): object {
		const struct: KeyValuePair = { ...data };

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
