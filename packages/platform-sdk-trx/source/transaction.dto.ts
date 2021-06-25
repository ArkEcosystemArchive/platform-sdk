import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData
{
	public override id(): string {
		return this.data.txID;
	}

	public override blockId(): string | undefined {
		return `${this.data.blockNumber}`;
	}

	public override timestamp(): DateTime | undefined {
		return DateTime.make(this.data.raw_data.timestamp);
	}

	public override confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public override sender(): string {
		return this.data.raw_data.contract[0].parameter.value.owner_address;
	}

	public override recipient(): string {
		return this.data.raw_data.contract[0].parameter.value.to_address;
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.data.raw_data.contract[0].parameter.value.amount);
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(this.data.ret[0].fee);
	}

	public override memo(): string | undefined {
		return Buffer.from(this.data.raw_data.data || "", "hex").toString() || undefined;
	}

	public override isConfirmed(): boolean {
		return this.data.ret[0].contractRet === "SUCCESS";
	}

	public override isSent(): boolean {
		return this.getMeta("address") === this.sender();
	}

	public override isReceived(): boolean {
		return this.getMeta("address") === this.recipient();
	}
}
