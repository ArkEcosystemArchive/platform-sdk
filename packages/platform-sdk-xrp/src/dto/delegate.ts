import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class DelegateData implements Contracts.DelegateData {
	readonly #data: Contracts.KeyValuePair;

	public constructor (data: Contracts.KeyValuePair) {
		this.#data = data;
	}

	public getAddress(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getAddress");
	}

	public getPublicKey(): string {
		return this.#data.validation_public_key;
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): Contracts.KeyValuePair {
		return this.#data;
	}
}
