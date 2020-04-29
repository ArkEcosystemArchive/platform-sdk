import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class Crypto implements Contracts.Crypto {
	public constructor(network: string) {
		//
	}

	public async createTransfer(data: Contracts.KeyValuePair): Promise<object> {
		throw new Exceptions.NotImplemented(this.constructor.name, "createTransfer");
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
