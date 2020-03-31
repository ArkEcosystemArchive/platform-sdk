import { BigNumber } from "@arkecosystem/utils";

import { KeyValuePair } from "../../../types";
import { Transaction as Contract } from "../../contracts/client";

export class Transaction implements Contract {
	readonly #data: KeyValuePair;

	public constructor(data: KeyValuePair) {
		this.#data = data;
	}

	public getId(): string {
		return this.#data.id;
	}

	public getType(): number | undefined {
		return this.#data.type;
	}

	public getTypeGroup(): number | undefined {
		return undefined;
	}

	public getTimestamp(): number | undefined {
		return this.#data.timestamp;
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
		return this.#data.asset.recipientId;
	}

	public getAmount(): BigNumber {
		return BigNumber.make(this.#data.asset.amount);
	}

	public getFee(): BigNumber {
		return BigNumber.make(this.#data.fee);
	}

	public getVendorField(): string | undefined {
		return this.#data.asset.data;
	}

	public getBlockId(): string {
		return this.#data.blockId;
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): KeyValuePair {
		return this.#data;
	}
}
