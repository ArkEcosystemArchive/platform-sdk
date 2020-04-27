import { BigNumber } from "@arkecosystem/utils";

import { KeyValuePair } from "../../../types";
import { Transaction as Contract } from "../../contracts/client";

export class Transaction implements Contract {
	readonly #data: KeyValuePair;

	public constructor(data: KeyValuePair) {
		this.#data = data;
	}

	public getId(): string {
		return this.#data.txhash;
	}

	public getType(): number | undefined {
		return undefined;
	}

	public getTypeGroup(): number | undefined {
		return undefined;
	}

	public getTimestamp(): number | undefined {
		return +new Date(this.#data.timestamp);
	}

	public getConfirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public getNonce(): string | undefined {
		return undefined;
	}

	public getSender(): string {
		const event = this.#data.events.find((event) => event.type === "message");
		const attribute = event.attributes.find((attribute) => attribute.key === "sender");

		return attribute.value;
	}

	public getRecipient(): string {
		const event = this.#data.events.find((event) => event.type === "transfer");
		const attribute = event.attributes.find((attribute) => attribute.key === "recipient");

		return attribute.value;
	}

	// @ts-ignore
	public getAmount(): BigNumber {
		const event = this.#data.events.find((event) => event.type === "transfer");
		const attribute = event.attributes.find((attribute) => attribute.key === "amount");

		return attribute.value;
	}

	public getFee(): BigNumber {
		return BigNumber.make(this.#data.gas_used);
	}

	public getVendorField(): string | undefined {
		return this.#data.tx.value.memo;
	}

	public getBlockId(): string {
		return this.#data.height;
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): KeyValuePair {
		return this.#data;
	}
}
