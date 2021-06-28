import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	public override id(): string {
		return this.data.hash;
	}

	public override blockId(): string | undefined {
		return this.data.miniBlockHash;
	}

	public override timestamp(): DateTime {
		return DateTime.fromUnix(this.data.timestamp);
	}

	public override confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public override sender(): string {
		return this.data.sender;
	}

	public override recipient(): string {
		return this.data.receiver;
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.data.value);
	}

	public override fee(): BigNumber {
		return BigNumber.make(this.data.gasUsed).times(this.data.gasPrice);
	}

	public override isConfirmed(): boolean {
		return this.data.status === "success";
	}
}
