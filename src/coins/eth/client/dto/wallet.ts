import { Dictionary, Wallet as Contract } from "../../../contracts/client";

export class Wallet implements Contract {
	readonly #data: Dictionary;

	public constructor(data: Dictionary) {
		this.#data = data;
	}

	public getAddress(): string {
		return this.#data.address;
	}

	public getPublicKey(): string {
		return this.#data.publicKey;
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): Dictionary {
		return this.#data;
	}
}
