import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
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
		return this.bigNumberService.make(this.signedData.value.toString());
	}

	public fee(): BigNumber {
		return BigNumber.make(this.signedData.gasUsed).times(this.signedData.gasPrice);
	}

	public timestamp(): DateTime {
		return DateTime.make(this.signedData.timestamp);
	}
}
