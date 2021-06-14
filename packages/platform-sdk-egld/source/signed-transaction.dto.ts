import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData
{
	public override sender(): string {
		return this.signedData.sender;
	}

	public override recipient(): string {
		return this.signedData.receiver;
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.signedData.value);
	}

	public override fee(): BigNumber {
		return BigNumber.make(this.signedData.gasUsed).times(this.signedData.gasPrice);
	}

	public override timestamp(): DateTime {
		return DateTime.make(this.signedData.timestamp);
	}
}
