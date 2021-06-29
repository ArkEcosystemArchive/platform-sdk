import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	public override id(): string {
		return "TODO";
	}

	public override blockId(): string | undefined {
		return undefined;
	}

	public override timestamp(): DateTime {
		return DateTime.make();
	}

	public override confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public override sender(): string {
		return "TODO";
	}

	public override recipient(): string {
		return "TODO";
	}

	public override amount(): BigNumber {
		return BigNumber.ZERO;
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(this.data.fee);
	}
}
