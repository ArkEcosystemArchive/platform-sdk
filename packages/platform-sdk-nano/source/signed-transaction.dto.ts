import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData
{
	public override sender(): string {
		return this.signedData.fromAddress;
	}

	public override recipient(): string {
		return this.signedData.toAddress;
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.signedData.amountRaw);
	}

	public override fee(): BigNumber {
		return BigNumber.ZERO;
	}

	public override timestamp(): DateTime {
		return DateTime.make(this.signedData.timestamp);
	}
}
