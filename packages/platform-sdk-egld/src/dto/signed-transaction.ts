import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { bigNumber } from "../container";

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
		return bigNumber(this.signedData.value.toString());
	}

	public fee(): BigNumber {
		return bigNumber(this.signedData.gasUsed).times(this.signedData.gasPrice);
	}

	public timestamp(): DateTime {
		return DateTime.make(this.signedData.timestamp);
	}

	public isMultiSignature(): boolean {
		return false;
	}

	public isMultiSignatureRegistration(): boolean {
		return false;
	}
}
