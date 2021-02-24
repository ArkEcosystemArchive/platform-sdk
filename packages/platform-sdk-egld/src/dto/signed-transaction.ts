import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public sender(): string {
		return this.signedData.sender;
	}

	public recipient(): string {
		return this.signedData.receiver;
	}

	public amount(): BigNumber {
		return BigNumber.make(this.signedData.value.toString());
	}

	public fee(): BigNumber {
		// @TODO: calculate fee from gasLimit, gasPrice and gasUsed
		return BigNumber.ZERO;
	}

	public isMultiSignature(): boolean {
		return false;
	}

	public isMultiSignatureRegistration(): boolean {
		return false;
	}
}
