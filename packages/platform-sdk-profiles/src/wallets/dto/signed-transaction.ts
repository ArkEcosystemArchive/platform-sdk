import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class SignedTransactionData extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public sender(): string {
		return this.signedData.sender;
	}

	public recipient(): string {
		return this.signedData.recipient;
	}

	public amount(): BigNumber {
		return BigNumber.make(this.signedData.amount);
	}

	public fee(): BigNumber {
		return BigNumber.make(this.signedData.fee);
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
