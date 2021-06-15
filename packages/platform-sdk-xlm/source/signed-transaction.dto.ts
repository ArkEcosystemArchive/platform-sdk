import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData
{
	public override sender(): string {
		return this.signedData._source;
	}

	public override recipient(): string {
		return this.signedData._operations[0].destination;
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.signedData._operations[0].amount);
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(this.signedData._fee);
	}

	public override timestamp(): DateTime {
		return DateTime.make(this.signedData.created_at);
	}
}
