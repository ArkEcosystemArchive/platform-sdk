import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class SignedTransactionData extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public sender(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "sender");
	}

	public recipient(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "recipient");
	}

	public amount(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "amount");
	}

	public fee(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "fee");
	}

	public isMultiSignature(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isMultiSignature");
	}

	public isMultiSignatureRegistration(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isMultiSignatureRegistration");
	}

	public isMultiSignatureReady(excludeFinal = false): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isMultiSignatureReady");
	}
}
