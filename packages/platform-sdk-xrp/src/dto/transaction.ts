import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class TransactionData implements Contracts.TransactionData {
	readonly #data: Contracts.KeyValuePair;

	public constructor (data: Contracts.KeyValuePair) {
		this.#data = data;
	}

	public getId(): string {
		return this.#data.hash;
	}

	public getType(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "getType");
	}

	public getTypeGroup(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "getTypeGroup");
	}

	public getTimestamp(): number | undefined {
		return +new Date(this.#data.date);
	}

	public getConfirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public getNonce(): string | undefined {
		return this.#data.tx.Sequence;
	}

	public getSender(): string {
		return this.#data.tx.Account;
	}

	public getRecipient(): string {
		return this.#data.tx.Destination;
	}

	public getAmount(): BigNumber {
		return BigNumber.make(this.#data.tx.Amount);
	}

	public getFee(): BigNumber {
		return BigNumber.make(this.#data.tx.Fee);
	}

	public getVendorField(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "getVendorField");
	}

	public getBlockId(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getBlockId");
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): Contracts.KeyValuePair {
		return this.#data;
	}
}
