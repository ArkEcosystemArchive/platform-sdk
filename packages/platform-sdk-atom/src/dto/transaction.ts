import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.txhash;
	}

	public type(): string {
		return "transfer";
	}

	public timestamp(): number | undefined {
		return +new Date(this.data.timestamp);
	}

	public confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public sender(): string {
		const event = this.data.events.find((event) => event.type === "message");
		const attribute = event.attributes.find((attribute) => attribute.key === "sender");

		return attribute.value;
	}

	public recipient(): string {
		const event = this.data.events.find((event) => event.type === "transfer");
		const attribute = event.attributes.find((attribute) => attribute.key === "recipient");

		return attribute.value;
	}

	// @ts-ignore
	public amount(): BigNumber {
		const event = this.data.events.find((event) => event.type === "transfer");
		const attribute = event.attributes.find((attribute) => attribute.key === "amount");

		return BigNumber.make(attribute.value.replace(/\D/g, ""));
	}

	public fee(): BigNumber {
		return BigNumber.make(this.data.gas_used);
	}

	public memo(): string | undefined {
		return this.data.tx.value.memo;
	}

	public asset(): object | undefined {
		return {};
	}
}
