import { Dictionary, Transaction as Contract } from "../../../contracts";

export class Transaction implements Contract {
	readonly #data: Dictionary;

	public constructor(data: Dictionary) {
		this.#data = data;
	}

	public getId(): string {
		return this.#data.id;
	}

	public getAmount(): string {
		return this.#data.amount;
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): Dictionary {
		return this.#data;
	}
}
