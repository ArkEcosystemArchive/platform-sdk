import { BigNumber } from "@arkecosystem/utils";

import { NotImplemented } from "../../../exceptions";
import { KeyValuePair } from "../../../types";
import { Transaction as Contract } from "../../contracts/client";

export class Transaction implements Contract {
	readonly #data: KeyValuePair;

	public constructor(data: KeyValuePair) {
		this.#data = data;
	}

	public getId(): string {
		return this.#data.hash;
	}

	public getType(): number | undefined {
		throw new NotImplemented(this.constructor.name, "getType");
	}

	public getTypeGroup(): number | undefined {
		throw new NotImplemented(this.constructor.name, "getTypeGroup");
	}

	public getTimestamp(): number | undefined {
		return this.#data.time;
	}

	public getConfirmations(): BigNumber {
		throw new NotImplemented(this.constructor.name, "getConfirmations");
	}

	public getNonce(): string {
		throw new NotImplemented(this.constructor.name, "getNonce");
	}

	public getSender(): string {
		throw new NotImplemented(this.constructor.name, "getSender");
	}

	public getRecipient(): string {
		throw new NotImplemented(this.constructor.name, "getRecipient");
	}

	public getAmount(): BigNumber {
		throw new NotImplemented(this.constructor.name, "getAmount");
	}

	public getFee(): BigNumber {
		throw new NotImplemented(this.constructor.name, "getFee");
	}

	public getVendorField(): string | undefined {
		throw new NotImplemented(this.constructor.name, "getVendorField");
	}

	public getBlockId(): string {
		return this.#data.block_height;
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): KeyValuePair {
		return this.#data;
	}
}
