import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
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
		return BigNumber.make(this.signedData.value.toString()).divide(1e18).times(1e8);
	}

	public fee(): BigNumber {
		return BigNumber.make(this.signedData.gasUsed).times(this.signedData.gasPrice).divide(1e18).times(1e8);
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
