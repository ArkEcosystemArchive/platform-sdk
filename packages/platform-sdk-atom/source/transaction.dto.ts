import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public override id(): string {
		return this.data.txhash;
	}

	public override blockId(): string | undefined {
		return undefined;
	}

	public override timestamp(): DateTime | undefined {
		return DateTime.make(this.data.timestamp);
	}

	public override confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public override sender(): string {
		const event = this.data.events.find(({ type }) => type === "message");
		const attribute = event.attributes.find(({ key }) => key === "sender");

		return attribute.value;
	}

	public override recipient(): string {
		const event = this.data.events.find(({ type }) => type === "transfer");
		const attribute = event.attributes.find(({ key }) => key === "recipient");

		return attribute.value;
	}

	// @ts-ignore
	public amount(): BigNumber {
		const event = this.data.events.find(({ type }) => type === "transfer");
		const attribute = event.attributes.find(({ key }) => key === "amount");

		return this.bigNumberService.make(attribute.value.replace(/\D/g, ""));
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(this.data.gas_used);
	}

	public override memo(): string | undefined {
		return this.data.tx.value.memo;
	}
}
