import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public sender(): string {
		return this.signedData.raw_data.contract[0].parameter.value.owner_address;
	}

	public recipient(): string {
		return this.signedData.raw_data.contract[0].parameter.value.to_address;
	}

	public amount(): BigNumber {
		return BigNumber.make(this.signedData.raw_data.contract[0].parameter.value.amount);
	}

	public fee(): BigNumber {
		return BigNumber.ZERO;
	}

	public timestamp(): DateTime {
		return DateTime.make(this.signedData.raw_data.timestamp);
	}

	public isMultiSignature(): boolean {
		return false;
	}

	public isMultiSignatureRegistration(): boolean {
		return false;
	}
}
