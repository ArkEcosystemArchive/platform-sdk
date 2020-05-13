import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.txhash;
	}

	public type(): number | undefined {
		return undefined;
	}

	public typeGroup(): number | undefined {
		return undefined;
	}

	public timestamp(): number | undefined {
		return +new Date(this.data.timestamp);
	}

	public confirmations(): Utils.BigNumber {
		return Utils.BigNumber.ZERO;
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
	public amount(): Utils.BigNumber {
		const event = this.data.events.find((event) => event.type === "transfer");
		const attribute = event.attributes.find((attribute) => attribute.key === "amount");

		return Utils.BigNumber.make(attribute.value.replace(/\D/g, ""));
	}

	public fee(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.gas_used);
	}

	public memo(): string | undefined {
		return this.data.tx.value.memo;
	}

	public asset(): object | undefined {
		return {};
	}
}
