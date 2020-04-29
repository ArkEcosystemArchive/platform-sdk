import { Contracts } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class TransactionData implements Contracts.TransactionData {
	readonly #data: Contracts.KeyValuePair;

	public constructor (data: Contracts.KeyValuePair) {
		this.#data = data;
	}

	public getId(): string {
		return this.#data.id;
	}

	public getType(): number | undefined {
		return this.#data.type;
	}

	public getTypeGroup(): number | undefined {
		return this.#data.typeGroup;
	}

	public getTimestamp(): number | undefined {
		return this.#data.timestamp.epoch;
	}

	public getConfirmations(): BigNumber {
		return BigNumber.make(this.#data.confirmations);
	}

	public getNonce(): string | undefined {
		return this.#data.nonce;
	}

	public getSender(): string {
		return this.#data.senderPublicKey;
	}

	public getRecipient(): string {
		return this.#data.recipient;
	}

	public getAmount(): BigNumber {
		return BigNumber.make(this.#data.amount);
	}

	public getFee(): BigNumber {
		return BigNumber.make(this.#data.fee);
	}

	public getVendorField(): string | undefined {
		return this.#data.vendorField;
	}

	public getBlockId(): string {
		return this.#data.blockId;
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): Contracts.KeyValuePair {
		return this.#data;
	}
}
