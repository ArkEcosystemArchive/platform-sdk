import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public sender(): string {
		return this.signedData._source;
	}

	public recipient(): string {
		return this.signedData._operations[0].destination;
	}

	public amount(): BigNumber {
		return this.signedData._operations[0].amount;
	}

	public fee(): BigNumber {
		return this.signedData._fee;
	}

	public timestamp(): DateTime {
		throw new Exceptions.NotImplemented(this.constructor.name, this.timestamp.name);
	}

	public isMultiSignature(): boolean {
		return false;
	}

	public isMultiSignatureRegistration(): boolean {
		return false;
	}
}
