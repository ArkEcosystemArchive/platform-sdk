import { NotImplemented } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { Crypto } from "../contracts/crypto";

export class Atom implements Crypto {
	public constructor(network: string) {
		//
	}

	public createTransfer(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createTransfer");
	}

	public createSecondSignature(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createSecondSignature");
	}

	public createDelegateRegistration(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createDelegateRegistration");
	}

	public createVote(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createVote");
	}

	public createMultiSignature(data: KeyValuePair): object {
		throw new NotImplemented(this.constructor.name, "createMultiSignature");
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
}
