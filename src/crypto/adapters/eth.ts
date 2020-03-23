import { NotImplemented } from "../../exceptions";
import { Crypto, TransactionInput } from "../contracts";

export class Ethereum implements Crypto {
	public createTransfer(data: TransactionInput): object {
		throw new NotImplemented(this.constructor.name, "createTransfer");
	}

	public createSecondSignature(data: TransactionInput): object {
		throw new NotImplemented(this.constructor.name, "createSecondSignature");
	}

	public createDelegateRegistration(data: TransactionInput): object {
		throw new NotImplemented(this.constructor.name, "createDelegateRegistration");
	}

	public createVote(data: TransactionInput): object {
		throw new NotImplemented(this.constructor.name, "createVote");
	}

	public createMultiSignature(data: TransactionInput): object {
		throw new NotImplemented(this.constructor.name, "createMultiSignature");
	}

	public createIpfs(data: TransactionInput): object {
		throw new NotImplemented(this.constructor.name, "createIpfs");
	}

	public createMultiPayment(data: TransactionInput): object {
		throw new NotImplemented(this.constructor.name, "createMultiPayment");
	}

	public createDelegateResignation(data: TransactionInput): object {
		throw new NotImplemented(this.constructor.name, "createDelegateResignation");
	}

	public createHtlcLock(data: TransactionInput): object {
		throw new NotImplemented(this.constructor.name, "createHtlcLock");
	}

	public createHtlcClaim(data: TransactionInput): object {
		throw new NotImplemented(this.constructor.name, "createHtlcClaim");
	}

	public createHtlcRefund(data: TransactionInput): object {
		throw new NotImplemented(this.constructor.name, "createHtlcRefund");
	}
}
