import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	public override id(): string {
		return this.data.hash;
	}

	public override blockId(): string | undefined {
		return this.data.hash;
	}

	public override timestamp(): DateTime {
		return DateTime.fromUnix(this.data.local_timestamp);
	}

	public override confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public override sender(): string {
		if (this.isSent()) {
			return this.data._origin;
		}

		return this.data.account;
	}

	public override recipient(): string {
		if (this.isReceived()) {
			return this.data._origin;
		}

		return this.data.account;
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.data.amount);
	}

	public override fee(): BigNumber {
		return BigNumber.ZERO;
	}

	public override isConfirmed(): boolean {
		return true;
	}

	public override isSent(): boolean {
		return this.data.type === "send";
	}

	public override isReceived(): boolean {
		return this.data.type === "receive";
	}
}
