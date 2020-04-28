import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class Delegate implements Contracts.Delegate {
	readonly #data: Contracts.KeyValuePair;

	public constructor(data: Contracts.KeyValuePair) {
		this.#data = data;
	}

	public getAddress(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, 'getAddress');
	}

	public getPublicKey(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, 'getPublicKey');
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): Contracts.KeyValuePair {
		return this.#data;
	}
}
