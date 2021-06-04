import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { bigNumber } from "../container";

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
		return bigNumber(this.signedData._operations[0].amount);
	}

	public fee(): BigNumber {
		return bigNumber(this.signedData._fee);
	}

	public timestamp(): DateTime {
		return DateTime.make(this.signedData.created_at);
	}

	public isMultiSignature(): boolean {
		return false;
	}

	public isMultiSignatureRegistration(): boolean {
		return false;
	}
}
