import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public sender(): string {
		return "TODO";
	}

	public recipient(): string {
		return "TODO";
	}

	public amount(): BigNumber {
		return BigNumber.make(this.signedData.amountRaw, this.decimals);
	}

	public fee(): BigNumber {
		return BigNumber.ZERO;
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
