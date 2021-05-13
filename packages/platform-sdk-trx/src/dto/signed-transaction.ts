import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public sender(): string {
		return "SENDER";
	}

	public recipient(): string {
		return "RECIPIENT";
	}

	public amount(): BigNumber {
		return BigNumber.ZERO;
	}

	public fee(): BigNumber {
		return BigNumber.ZERO;
	}

	public isMultiSignature(): boolean {
		return false;
	}

	public isMultiSignatureRegistration(): boolean {
		throw false;
	}
}
